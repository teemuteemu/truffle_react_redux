pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;
  event SetValue(uint value);

  function set(uint x) public {
    storedData = x;

    SetValue(storedData);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
