#include "enigma_machine.hpp"
#include <iostream>
#include <limits>
using namespace std;

EnigmaMachine::EnigmaMachine(int offset1, int offset2, int offset3)
    : rotor1(offset1), rotor2(offset2), rotor3(offset3), plugboard(),
      reflector(), plugboardEnd() {}

char EnigmaMachine::encryptSingle(char c, string jumbledAlpha1,
                                  string jumbledAlpha2, string jumbledAlpha3,
                                  string jumbledAlphaReflector,
                                  string jumbledAlphaPlugboard) {

  size_t index;
  char ch = toupper(c);
  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  index = ch - 'A';
  ch = jumbledAlphaPlugboard[index];

  index = ch - 'A';
  ch = jumbledAlpha1[index];

  index = ch - 'A';
  ch = jumbledAlpha2[index];

  index = ch - 'A';
  ch = jumbledAlpha3[index];

  index = ch - 'A';
  ch = jumbledAlphaReflector[index];

  index = ch - 'A';
  ch = alphabet[jumbledAlpha3.find(ch)];

  index = ch - 'A';
  ch = alphabet[jumbledAlpha2.find(ch)];

  index = ch - 'A';
  ch = alphabet[jumbledAlpha1.find(ch)];

  index = jumbledAlphaPlugboard.find(ch);
  ch = alphabet[index];

  return ch;
}

int main() {
  string plainText = "";
  string cipherText = "";
  string jumbledAlpha1 = "";
  string jumbledAlpha2 = "";
  string jumbledAlpha3 = "";
  string jumbledAlphaReflector = "";
  string jumbledAlphaPlugboard = "";

  int offset1;
  int offset2;
  int offset3;
  int numPlugboardSwitch;
  char pairChecker1;
  char pairChecker2;
  int offsetChecker;
  char plugPair[20] = {};
  cout << "Enter the number of plugboard switches (max 10):\n";
  cin >> numPlugboardSwitch;
  if (numPlugboardSwitch > 10) {
    cout << "Number of plugboard switches cannot exceed 10. Defaulting to "
            "10.\n";
    numPlugboardSwitch = 10;
  }
  for (int i = 0; i < numPlugboardSwitch * 2; i += 2) {

    cout << "Enter the first character of switch " << i / 2 + 1 << ":\n";
    cin >> pairChecker1;
    pairChecker1 = toupper(pairChecker1);
    cout << "";
    cout << "Enter the second character of switch " << i / 2 + 1 << ":\n";
    cin >> pairChecker2;
    pairChecker2 = toupper(pairChecker2);

    if (isalpha(pairChecker1) == false || isalpha(pairChecker2) == false) {
      cout << "Invalid input. Please enter an alphabet character.\n";
      i -= 2;
      continue;
    }

    if (pairChecker1 == pairChecker2) {
      cout << "Invalid input. Please enter different characters.\n";
      i -= 2;
      continue;
    }

    if (find(plugPair, plugPair + i, pairChecker1) != plugPair + i ||
        find(plugPair, plugPair + i, pairChecker2) != plugPair + i) {
      cout << "Invalid input. Please enter different characters.\n";
      i -= 2;
      continue;
    }
    plugPair[i] = pairChecker1;
    plugPair[i + 1] = pairChecker2;
  }

  int temp = 1;
  while (true) {
    cout << "Enter your offset for rotor " << temp << ":\n";
    cin >> offsetChecker;
    while (cin.fail()) {
      cout << "Invalid input. Please enter a number:\n";
      cin.clear();
      cin.ignore(numeric_limits<streamsize>::max(), '\n');
      cin >> offsetChecker;
    }
    if (temp == 1) {
      offset1 = offsetChecker % 26;
    } else if (temp == 2) {
      offset2 = offsetChecker % 26;
    } else if (temp == 3) {
      offset3 = offsetChecker % 26;
    }
    temp++;
    if (temp > 3) {
      break;
    }
  }
  cout << "Enter your plain text: (Enter your numbers as letters) Any "
          "non-alphabet characters will be converted into space\n";
  cin.ignore();
  getline(cin, plainText);

  EnigmaMachine enigma(offset1, offset2, offset3);

  enigma.getRotor1().makeJumbledAlpha();
  enigma.getRotor1().jumbledAlphaOffset();
  jumbledAlpha1 = enigma.getRotor1().getJumbledAlpha();

  enigma.getRotor2().makeJumbledAlpha();
  enigma.getRotor2().jumbledAlphaOffset();
  jumbledAlpha2 = enigma.getRotor2().getJumbledAlpha();

  enigma.getRotor3().makeJumbledAlpha();
  enigma.getRotor3().jumbledAlphaOffset();
  jumbledAlpha3 = enigma.getRotor3().getJumbledAlpha();

  enigma.getReflector().setUpReflector();
  jumbledAlphaReflector = enigma.getReflector().getAlphaMapping();

  for (int i = 0; i < numPlugboardSwitch * 2; i += 2) {
    enigma.getPlugboard().addSwap(plugPair[i], plugPair[i + 1]);
  }

  jumbledAlphaPlugboard = enigma.getPlugboard().getAlphaMapping();

  EnigmaMachine enigmaDecrypt = enigma;

  int letterCount = 0;
  for (size_t i = 0; i < plainText.length(); i++) {
    if (!isalpha(plainText[i])) {
      cipherText += ' ';
      continue;
    }

    char tempChar = toupper(plainText[i]);

    cipherText += enigma.encryptSingle(tempChar, jumbledAlpha1, jumbledAlpha2,
                                       jumbledAlpha3, jumbledAlphaReflector,
                                       jumbledAlphaPlugboard);

    enigma.getRotor1().step();
    jumbledAlpha1 = enigma.getRotor1().getJumbledAlpha();

    if (++letterCount % 26 == 0) {
      enigma.getRotor2().step();
      jumbledAlpha2 = enigma.getRotor2().getJumbledAlpha();
    }
    if (letterCount % 676 == 0) {
      enigma.getRotor3().step();
      jumbledAlpha3 = enigma.getRotor3().getJumbledAlpha();
    }
  }

  cout << "Encrypted Text:\n" << cipherText << "\n";
  return 0;
}
