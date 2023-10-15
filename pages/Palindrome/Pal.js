function check() {
    var word = document.getElementById("name").value;
    var arrword = Array.from(word);
    var count = arrword.length;
    var index = count - 1;
    var isPalindrom = true;
    for (var i = 0; i < index; i++){
      if (arrword[i].toLowerCase() == arrword[index].toLowerCase()) {
        isPalindrom = true;
        index--;
        if (i == index) break;
      } else {
        isPalindrom = false;
        break;
      }
    }
  
  document.getElementById('PLD').innerHTML = isPalindrom ? "The word or number " + word + " is a palindrome." : "The word or number " + word + " is not a palindrome"
}