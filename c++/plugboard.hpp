#ifndef PLUGBOARD_HPP
#define PLUGBOARD_HPP

#include <string>
#include <vector>

class Plugboard {
private:
    std::string alpha;

public:
    Plugboard();

    // Constructor that accepts a custom alphabet (e.g., from rotor output)
    Plugboard(const std::string& jumbledAlpha);
    // Add a swap, e.g. "AF" or pair (char a, char b)
    void addSwap(char a, char b);
    void setJumbledAlpha(const std::string& jumbledAlpha);
    // Returns the swapped alphabet
    std::string getAlphaMapping() const;

    void setUpReflector();    // for reflector

};

#endif
