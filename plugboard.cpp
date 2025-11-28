#include "Plugboard.hpp"
#include <algorithm>

Plugboard::Plugboard()
    : alpha("ABCDEFGHIJKLMNOPQRSTUVWXYZ") {}

void Plugboard::addSwap(char a, char b) {
    // convert to uppercase
    a = toupper(a);
    b = toupper(b);

    // find positions
    int indexA = alpha.find(a);
    int indexB = alpha.find(b);
    if (indexA != std::string::npos && indexB != std::string::npos) {
      if (indexA != indexB) {
        std::swap(alpha[indexA], alpha[indexB]);
      }
    }
}

void Plugboard::Reflector() {
    addSwap('A', 'Y');
    addSwap('B', 'R');
    addSwap('C', 'U');
    addSwap('D', 'H');
    addSwap('E', 'Q');
    addSwap('F', 'S');
    alpha.addSwap('G', 'L');
    alpha.addSwap('I', 'P');
    alpha.addSwap('J', 'X');
    alpha.addSwap('K', 'N');
    alpha.addSwap('M', 'O');
    alpha.addSwap('T', 'Z');
    alpha.addSwap('V', 'W');
}

std::string Plugboard::getAlphaMapping() const {
    return alpha;
}
