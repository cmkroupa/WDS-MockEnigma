#include "rotor.hpp"
#include <algorithm>
#include <random>

using namespace std;
Rotor::Rotor(int offset)
    : offset(offset), alpha("JAIQLMXRPHNDKEGYSFTOBZCVUW") {}

void Rotor::makeJumbledAlpha() { jumbledAlpha = alpha; }

void Rotor::jumbledAlphaOffset() {

  int n = jumbledAlpha.size();
  int shift = offset % n; // ensure valid range
  std::rotate(jumbledAlpha.rbegin(), jumbledAlpha.rbegin() + shift,
              jumbledAlpha.rend());
}

string Rotor::getJumbledAlpha() const { return jumbledAlpha; }

void Rotor::setJumbledAlpha(const string &s) { jumbledAlpha = s; }
void Rotor::step() {
  std::rotate(jumbledAlpha.rbegin(), jumbledAlpha.rbegin() + 1,
              jumbledAlpha.rend());
}
