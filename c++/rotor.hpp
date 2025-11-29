#ifndef ROTOR_HPP
#define ROTOR_HPP

#include <string>
using namespace std;
class Rotor {
private:
    int offset;
    std::string jumbledAlpha;
    std::string alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

public:
    // Constructor declaration (no body!)
    Rotor(int offset);
    void jumbledAlphaOffset();
    // Function declaration
    void makeJumbledAlpha();
    string getJumbledAlpha() const;
    void step();
    void setJumbledAlpha(const string& s);

};

#endif
