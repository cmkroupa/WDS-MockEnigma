#include "plugboard.hpp"
#include <cctype>

int char_to_index(char c) { return c - 'A'; }

char index_to_char(int i) { return 'A' + i; }

// --- Constructor ---
Plugboard::Plugboard() {
  for (int i = 0; i < 26; ++i) {
    mapping[i] = index_to_char(i);
  }
}

void Plugboard::add_swap(char c1, char c2) {
  c1 = toupper(c1);
  c2 = toupper(c2);

  int index1 = char_to_index(c1);
  int index2 = char_to_index(c2);

  mapping[index1] = c2;
  mapping[index2] = c1;
}

char Plugboard::encrypt(char c) const {
  c = toupper(c);

  int index = char_to_index(c);

  return mapping[index];
}