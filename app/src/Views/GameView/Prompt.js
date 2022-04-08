const PROMPT_ARRAY = ["Describe your funniest moment this year",
  "How would your perfect date go?", 
  "The government wants me dead because I know too much about ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "Drugs? No thanks, I already have ˍˍˍˍˍˍˍˍˍˍˍˍˍ in my life.",
  "My perfect world would be controlled by ˍˍˍˍˍˍˍˍˍˍˍˍˍ with ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "ˍˍˍˍˍˍˍˍˍˍˍˍˍ, High five bro.",
  "A romantic, candlelit dinner would be incomplete without ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "Next from J.K. Rowling: Harry Potter and the Chamber of ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "Heaven is full of ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "Scientists recently discovered a new civilization deep in the amazon that worships ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "Ew. Why does Grandpa smell like ˍˍˍˍˍˍˍˍˍˍˍˍˍ?",
  "Okay kids, this week our special guest ˍˍˍˍˍˍˍˍˍˍˍˍˍ will teach you about ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "Why are we all here? Just to ˍˍˍˍˍˍˍˍˍˍˍˍˍ?",
  "Sorry maam, my ˍˍˍˍˍˍˍˍˍˍˍˍˍ ate my homework!",
  "With every Happy meal, children now get ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "Why can't you sleep at night?",
  "But before I kill you, mister Bond, I want to show you my ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "The reason dad never returned from his buisness trip was ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "Combining ˍˍˍˍˍˍˍˍˍˍˍˍˍ with ˍˍˍˍˍˍˍˍˍˍˍˍˍ seemed like a great idea.. until ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "My favorite cocktail can't be complete without ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "If you dont finish your meal, ˍˍˍˍˍˍˍˍˍˍˍˍˍ will ˍˍˍˍˍˍˍˍˍˍˍˍˍ you tonight!",
  "ˍˍˍˍˍˍˍˍˍˍˍˍˍ, tested on children and approved by ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "War! What is it good for?",
  "My Hair stylist really judged me for this look I was going for:",
  "Studies have shown that laboratory rats find their way through a mace 50% faster after being exposed to ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "Mmmmm, ˍˍˍˍˍˍˍˍˍˍˍˍˍ. Wait, why are you all looking at me weird?",
  "What's that smell?",
  "Honestly, half of the time I'm not even paying attention, there is too much ˍˍˍˍˍˍˍˍˍˍˍˍˍ on my mind.",
  "I did not expect ˍˍˍˍˍˍˍˍˍˍˍˍˍ to be the reason I lost \"Who Wants to be a millionaire\"",
  "I have a crippling addiction to ˍˍˍˍˍˍˍˍˍˍˍˍˍ. But it's all because of ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "If I were a millionaire, I would build a giant statue commemorating ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "I knew this day wouldn't go well when the first thing I saw in the morning was ˍˍˍˍˍˍˍˍˍˍˍˍˍ, lying in bed right next to me.",
  "I once found myself in a dark room with only ˍˍˍˍˍˍˍˍˍˍˍˍˍ and ˍˍˍˍˍˍˍˍˍˍˍˍˍ. Things went pretty well all things considered.",
  "Every day is a ˍˍˍˍˍˍˍˍˍˍˍˍˍ day!",
  "Help! I'm trapped in a ˍˍˍˍˍˍˍˍˍˍˍˍˍ with ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "The biggest lie I ever told was ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "ˍˍˍˍˍˍˍˍˍˍˍˍˍ Is good, ˍˍˍˍˍˍˍˍˍˍˍˍˍ is better.",
  "Sorry, sir, but our house policy does not allow ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "What gets everywhere?",
  "What is the worst thing to fall into?",
  "What should not go in your mouth?",
  "If you havent tried ˍˍˍˍˍˍˍˍˍˍˍˍˍ already, you really should.",
  "Did you know they only recently stopped teaching ˍˍˍˍˍˍˍˍˍˍˍˍˍ at Hogwarts?",
  "Who should win the  next election?",
  "Man oh man, these ˍˍˍˍˍˍˍˍˍˍˍˍˍ are starting to get on my nerves with their ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "Facebook recently acquired acquired ˍˍˍˍˍˍˍˍˍˍˍˍˍ. Honestly, i expected that to happen sooner.",
  "Is there any way to make a profit out of ˍˍˍˍˍˍˍˍˍˍˍˍˍ? Of course there is, ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "The pope recently admitted to ˍˍˍˍˍˍˍˍˍˍˍˍˍ",
  "After all is said and done, there will only be the one essential question left. Why ˍˍˍˍˍˍˍˍˍˍˍˍˍ?",
  "My ideal superpower would defenitely be related to ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "What's a little ˍˍˍˍˍˍˍˍˍˍˍˍˍ between friends?",
  "Come on, help a friend out, it's only a little ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "Yoo, duuude. I didn't expect ˍˍˍˍˍˍˍˍˍˍˍˍˍ to be this gooooood!",
  "A new virus has broken out! Everybody needs to stay away from ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "This would be a lot more fun if it wasn't for ˍˍˍˍˍˍˍˍˍˍˍˍˍ",
  "Why is it so hard to get up in the morning?",
  "What brings me the most happiness? Why, ˍˍˍˍˍˍˍˍˍˍˍˍˍ, of course!",
  "It all came crashing down after we added ˍˍˍˍˍˍˍˍˍˍˍˍˍ to ˍˍˍˍˍˍˍˍˍˍˍˍˍ.",
  "The reason why I dont trust ˍˍˍˍˍˍˍˍˍˍˍˍˍ? ˍˍˍˍˍˍˍˍˍˍˍˍˍ!",
  "ˍˍˍˍˍˍˍˍˍˍˍˍˍ didn't sound like such a bad idea until ˍˍˍˍˍˍˍˍˍˍˍˍˍ",
  "My last exam would have gone great if it wasn't for  ˍˍˍˍˍˍˍˍˍˍˍˍˍ !"];


class Prompt {

constructor(){
  this.promptField = document.getElementById("promptField");
  }


  getRandomInt(max) {

    return Math.floor(Math.random() * max);

  }

  generatePrompt() {

    let randomNumber = this.getRandomInt(PROMPT_ARRAY.length);
    return PROMPT_ARRAY[randomNumber];
  }

}
export default Prompt;