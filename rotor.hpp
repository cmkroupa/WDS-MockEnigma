#ifndef ROTOR_HPP
#define ROTOR_HPP

#include <string>

class Rotor {
private:
    int offset;
    std::string jumbledAlpha;
    std::string alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

public:
    // Constructor declaration (no body!)
    Rotor(const std::string& jumbledAlpha, int offset);

    // Function declaration
    void makeJumbledAlpha();
};

#endif
