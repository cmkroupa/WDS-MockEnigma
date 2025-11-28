#include "Rotor.hpp"
#include <cstdlib>
#include <ctime>
#include <algorithm>
Rotor::Rotor(const std::string& jumbledAlpha, int offset)
    : jumbledAlpha(jumbledAlpha), offset(offset), alpha("ABCDEFGHIJKLMNOPQRSTUVWXYZ") {}

void Rotor::makeJumbledAlpha() {
    jumbledAlpha = alpha;
    static std::random_device rd;
    static std::mt19937 gen(rd());
    std::shuffle(jumbledAlpha.begin(), jumbledAlpha.end(), gen);
}

void Rotor::jumbledAlphaOffset() {

    int n = jumbledAlpha.size();
    int shift = offset % n; // ensure valid range
    std::rotate(jumbledAlpha.rbegin(), jumbledAlpha.rbegin() + shift, jumbledAlpha.rend());
}

string Rotor::getJumbledAlpha() const {
    return jumbledAlpha;
}

void Rotor::step() {
    std::rotate(jumbledAlpha.rbegin(),
                jumbledAlpha.rbegin() + 1,
                jumbledAlpha.rend());
}

