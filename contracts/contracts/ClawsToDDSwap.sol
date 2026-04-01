// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ClawsToDDSwap
 * @notice Swap CLAWS tokens for DD tokens at a fixed rate.
 *         Received CLAWS are forwarded to the creator wallet.
 *         DD is paid out from this contract's balance.
 */
contract ClawsToDDSwap is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable clawsToken;
    IERC20 public immutable ddToken;
    address public creatorWallet;
    uint256 public rate; // DD per 1 CLAWS (in whole tokens, both 18 decimals)

    event Swapped(address indexed buyer, uint256 clawsIn, uint256 ddOut);
    event RateUpdated(uint256 oldRate, uint256 newRate);
    event CreatorWalletUpdated(address oldWallet, address newWallet);
    event TokensWithdrawn(address token, uint256 amount);

    constructor(
        address _claws,
        address _dd,
        address _creatorWallet,
        uint256 _rate
    ) Ownable(msg.sender) {
        require(_claws != address(0), "Invalid CLAWS address");
        require(_dd != address(0), "Invalid DD address");
        require(_creatorWallet != address(0), "Invalid creator wallet");
        require(_rate > 0, "Rate must be > 0");

        clawsToken = IERC20(_claws);
        ddToken = IERC20(_dd);
        creatorWallet = _creatorWallet;
        rate = _rate;
    }

    /**
     * @notice Swap CLAWS for DD. Caller must have approved this contract for `clawsAmount`.
     * @param clawsAmount Amount of CLAWS to swap (in wei, 18 decimals).
     */
    function swap(uint256 clawsAmount) external nonReentrant {
        require(clawsAmount > 0, "Amount must be > 0");

        uint256 ddOut = clawsAmount * rate;
        require(ddToken.balanceOf(address(this)) >= ddOut, "Insufficient DD in contract");

        // Pull CLAWS from buyer and forward to creator wallet
        clawsToken.safeTransferFrom(msg.sender, creatorWallet, clawsAmount);

        // Send DD to buyer
        ddToken.safeTransfer(msg.sender, ddOut);

        emit Swapped(msg.sender, clawsAmount, ddOut);
    }

    /**
     * @notice Update the swap rate. Only owner.
     */
    function setRate(uint256 _newRate) external onlyOwner {
        require(_newRate > 0, "Rate must be > 0");
        emit RateUpdated(rate, _newRate);
        rate = _newRate;
    }

    /**
     * @notice Update the creator wallet. Only owner.
     */
    function setCreatorWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid address");
        emit CreatorWalletUpdated(creatorWallet, _newWallet);
        creatorWallet = _newWallet;
    }

    /**
     * @notice Withdraw any ERC-20 token from the contract. Only owner.
     */
    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");
        IERC20(token).safeTransfer(msg.sender, amount);
        emit TokensWithdrawn(token, amount);
    }

    /**
     * @notice Check how much DD is available for swaps.
     */
    function ddBalance() external view returns (uint256) {
        return ddToken.balanceOf(address(this));
    }
}
