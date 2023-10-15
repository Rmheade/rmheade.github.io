let ding = new Audio('mixkit-fairy-glitter-867.wav');

function playSound() {
  ding.play();
}

function check() {
  let randomNumber = Math.floor(Math.random() * 30);
  let fortune = ''
  switch (randomNumber) {
    case 0:
      fortune = 'A beautiful, smart, and loving person will be coming into your life.';
      playSound();
      break;
    case 1:
      fortune = 'A dubious friend may be an enemy in camouflage.';
      playSound();
      break;
    case 2:
      fortune = 'A faithful friend is a strong defense.';
      playSound();
      break;
    case 3:
      fortune = 'A feather in the hand is better than a bird in the air.';
      playSound();
      break;
    case 4:
      fortune = 'A fresh start will put you on your way.';
      playSound();
      break;
    case 5:
      fortune = 'A friend asks only for your time not your money.';
      playSound();
      break;
    case 6:
      fortune = 'A friend is a present you give yourself.';
      playSound();
      break;
    case 7:
      fortune = 'A gambler not only will lose what he has, but also will lose what he doesn’t have.';
      playSound();
      break;
    case 8:
      fortune = 'A golden egg of opportunity falls into your lap this month.';
      playSound();
      break
    case 9:
      fortune = 'A good friendship is often more important than a passionate romance.';
      playSound();
      break;
    case 10:
      fortune = 'A good time to finish up old tasks.';
      playSound();
      break;
    case 11:
      fortune = 'A hunch is creativity trying to tell you something.';
      playSound();
      break;
    case 12:
      fortune = 'A lifetime friend shall soon be made.';
      playSound();
      break
    case 13:
      fortune = 'A lifetime of happiness lies ahead of you.';
      playSound();
      break;
    case 14:
      fortune = 'A light heart carries you through all the hard times.';
      playSound();
      break;
    case 15:
      fortune = 'A new perspective will come with the new year.';
      playSound();
      break;
    case 16:
      fortune = 'The one that recognizes the illusion does not act as if it is real.';
      playSound();
      break;
    case 17:
      fortune = 'A person is never to old to learn.';
      playSound();
      break;
    case 18:
      fortune = 'A person of words and not deeds is like a garden full of weeds.';
      playSound();
      break;
    case 19:
      fortune = 'A pleasant surprise is waiting for you.';
      playSound();
      break;
    case 20:
    fortune = 'A short pencil is usually better than a long memory any day.';
		break;
    case 21:
    fortune = 'A small donation is call for. It’s the right thing to do.';
    break;
    case 22:
    fortune = 'A smile is your personal welcome mat.';
    break;
    case 23:
    fortune = 'A smooth long journey! Great expectations.';
    break;
    case 24:
    fortune = 'A soft voice may be awfully persuasive.';
    break;
    case 25:
    fortune = 'A truly rich life contains love and art in abundance.';
    break;
    case 26:
    fortune = 'Accept something that you cannot change, and you will feel better.';
    break;
    case 27:
    fortune = 'Adventure can be real happiness.';
    break;
    case 28:
    fortune = 'Advice is like kissing. It costs nothing and is a pleasant thing to do.';
    break;
    case 29:
    fortune = 'Advice, when most needed, is least heeded.';
    break;
    case 30:
    fortune = 'All the troubles you have will pass away very quickly.'
    break;
    default:
    fortune = 'All the effort you are making will ultimately pay off.'
    break;
  }
  document.getElementById('PLD').innerHTML = (fortune);
}