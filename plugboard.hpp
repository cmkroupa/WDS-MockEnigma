#ifndef PLUGBOARD_HPP
#define PLUGBOARD_HPP

#include <string>
#include <vector>

class Plugboard {
private:
    std::string alpha;

public:
    Plugboard();

    // Add a swap, e.g. "AF" or pair (char a, char b)
    void addSwap(char a, char b);

    // Returns the swapped alphabet
    std::string getAlphaMapping() const;

    void Reflector();    // for reflector

};

#endif
