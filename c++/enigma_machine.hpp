#ifndef ENIGMAMACHINE_HPP
#define ENIGMAMACHINE_HPP
#include "plugboard.hpp"
#include "rotor.hpp"
#include <algorithm>
#include <cctype>
#include <string>

class EnigmaMachine {
private:
  // 3 rotors
  Rotor rotor1;
  Rotor rotor2;
  Rotor rotor3;

  // 2 plugboards: main + reflector
  Plugboard plugboard;
  Plugboard reflector;
  Plugboard plugboardEnd;

public:
  // default constructor: creates empty rotors and plugboards
  EnigmaMachine(int offset1, int offset2, int offset3);

  // getters for rotors
  Rotor &getRotor1() { return rotor1; }
  Rotor &getRotor2() { return rotor2; }
  Rotor &getRotor3() { return rotor3; }

  char encryptSingle(char c, std::string jumbledAlpha1,
                     std::string jumbledAlpha2, std::string jumbledAlpha3,
                     std::string jumbledAlphaReflector,
                     std::string jumbledAlphaPlugboard);

  // getters for plugboards
  Plugboard &getPlugboard() { return plugboard; }
  Plugboard &getReflector() { return reflector; }
  Plugboard &getPlugboardEnd() { return plugboardEnd; }
};

#endif
