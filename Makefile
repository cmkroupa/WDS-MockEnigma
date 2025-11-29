CXX = g++
CXXFLAGS = -Wall -Wextra -std=c++17

TARGET = enigma

SRCS = enigma_machine.cpp plugboard.cpp rotor.cpp

OBJS = $(SRCS:.cpp=.o)

HEADERS = enigma_machine.hpp plugboard.hpp rotor.hpp

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)

%.o: %.cpp $(HEADERS)
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)

.PHONY: all clean
