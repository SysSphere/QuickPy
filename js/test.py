# Program 1: 
def reverse():
    stop = False
    while stop != True:
        text = input("Enter text: ")
        print(text[::-1])
        again = input("Again? (Y/N)")
        if again == "Y":
            reverse()
            print(text[::-1])
        else:
            print("Goodbye!")
            stop = True

reverse()