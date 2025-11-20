class Plugboard {
private:
  char mapping[26];

public:
  Plugboard();

  void add_swap(char c1, char c2);

  char encrypt(char c) const;
};