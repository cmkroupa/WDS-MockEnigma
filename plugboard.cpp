#include "plugboard.hpp"
#include <algorithm>

Plugboard::Plugboard() : alpha("ABCDEFGHIJKLMNOPQRSTUVWXYZ") {}

Plugboard::Plugboard(const std::string &jumbledAlpha)
    : alpha(jumbledAlpha) {} // use provided alphabet

void Plugboard::setJumbledAlpha(const std::string &jumbledAlpha) {
  alpha = jumbledAlpha;
}
void Plugboard::addSwap(char a, char b) {
  // convert to uppercase
  a = toupper(a);
  b = toupper(b);

  // find positions
  size_t indexA = alpha.find(a);
  size_t indexB = alpha.find(b);
  if (indexA != std::string::npos && indexB != std::string::npos) {
    if (indexA != indexB) {
      std::swap(alpha[indexA], alpha[indexB]);
    }
  }
}

void Plugboard::setUpReflector() {
  addSwap('A', 'Y');
  addSwap('B', 'R');
  addSwap('C', 'U');
  addSwap('D', 'H');
  addSwap('E', 'Q');
  addSwap('F', 'S');
  addSwap('G', 'L');
  addSwap('I', 'P');
  addSwap('J', 'X');
  addSwap('K', 'N');
  addSwap('M', 'O');
  addSwap('T', 'Z');
  addSwap('V', 'W');
}

std::string Plugboard::getAlphaMapping() const { return alpha; }
