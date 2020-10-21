'use strict'; //まずは 'use strict'; キーワードで厳密なエラーチェックをするように設定して、全体をブロックで囲っておくといいでしょう。
//今回のゲームですが、機能がわりと複雑なのでクラス構文を使っていきます
//完成版を見ると、ゲームの最初では、パネルは数字がない状態で pressed クラスがついているので、そういった li 要素を作ってあげれば良いでしょう。
{ 
  class Panel { //Panel クラスを作っていきましょう。
    constructor() {  //では、このあたりに Panel クラスを作ってあげて、コンストラクターの設定をしていきます。
      this.el = document.createElement('li');  //li 要素をプロパティとして持たせたいので、プロパティ名は、 element の el としてあげつつ、 document.createElement('li') としてあげればいいでしょう。
      this.el.classList.add('pressed');  //これで、 pressed クラスがついた li 要素を 4 つ持つボードができたので、続きは次回にしていきましょう。
      this.el.addEventListener('click', () => { //this.el に対して addEventListener() としてあげて、 click したら次のことをしてね、と書いてあげましょう。
        this.check();  //とりあえず、 check() というメソッドにしてあげて、下のほうでメソッドを作っていきましょう。
      })
    }

    getEl() {  //では、どうするかというと、 getEl() というメソッドを作ってあげて、単に el プロパティを返せばいいので、 return this.el; としてあげましょう。
      return this.el;
    }

    activate(num) { //パネルに配置する数値が渡ってくるので、とりあえず num という引数で受けてあげましょう。
      this.el.classList.remove('pressed'); //ここで何をするかというと、パネルから pressed クラスをとりあえず外したいので、 classList を使って classList.remove('pressed') としてあげましょう。
      this.el.textContent = num; //ここで何をするかというと、パネルから pressed クラスをとりあえず外したいので、 classList を使って classList.remove('pressed') としてあげましょう。
    }

    check() {
      if (currentNum === parseInt(this.el.textContent, 10)) { //どうするかというと、 currentNum と押し込んだパネルの数値が合っているか比較したいのですが、 this.el.textContent は文字列なので、 parseInt() で数値にしてあげて、比較してあげます。
        this.el.classList.add('pressed');  //もし一致していたら、つまり正解だったら、押し込まれるようにしたいので、 pressed クラスを付けてあげて、次の数値を選べるように currentNum を 1 増やしてあげれば OK でしょう。
        currentNum++;

        if (currentNum === 4) {  //あとは、全部パネルを押し込んだときに止めればいいので、 check() の中で currentNum を更新したあとに、条件分岐してあげましょう。
          clearTimeout(timeoutId); //currentNum が 4 だったらタイマーを止めればいいので clearTimeout() としてあげて timeoutId を渡してあげれば OK でしょう。
        }
      }
    }
  }

  class Board { //まずはパネルを管理する Board クラスを作ってあげましょう。
    constructor(){  //コンストラクターを書いてあげて、ここでインスタンスを作っておいてあげます。
      this.panels = [];  //では、コンストラクターの処理ですが、パネルを管理したいので、とりあえずプロパティで配列として持っておきましょう。
      for (let i = 0; i < 4; i++) {  //そのうえで、パネルを 4 枚作りたいので、ループを回してあげましょう。
        this.panels.push(new Panel());  //では、どうするかというと、 this.panels に対してあとで作っていく Panel クラスのインスタンスを push() してあげればいいですね。
      }
      this.setup();  //では、 Board クラスの中に、 setup() というメソッドを作って、コンストラクターのほうではそれを呼び出すだけにしてあげましょう。
    }
    setup() {  //では、こちらの setup() メソッドですが、ますは board 要素を取得しておきます
      const board = document.getElementById('board');  //setup() の中でしか使わないので、プロパティにする必要はなくて const で定数で宣言しておきましょう。
      this.panels.forEach(panel => {  //そのうえで panels の数だけ要素を追加していけばいいので、 forEach() を使っていきます。
        // board.appendChild(panel.el);今回追加するのは li 要素なので、 panel の el プロパティを追加してあげればよいのですけれども、実はクラスのプロパティに外部から直接アクセスしないほうがよいとされているので、こちらのプロパティはメソッド経由で取得するようにしてあげたほうがいいでしょう。
        board.appendChild(panel.getEl());  //では、いったんこちらコメントにしてあげて、 getElement という意味で getEl() というメソッドを Panel クラスのほうにあとで作っていきましょう。それから、こちらのように直接プロパティにアクセスせずに、わざわざメソッドを作ってアクセスすることをオブジェクト思考のカプセル化と呼びます
      });
    }

    activate() { //では Board クラスに activate() メソッドを作っていきます.どうするかというと、こちらではパネルから pressed クラスを外して、数値を配置してあげればいいですね。
      const nums = [0, 1, 2, 3]; //今回だと 0 から 3 なので、 nums という定数を用意してあげて、 [0, 1, 2, 3] と用意しておきましょう。

      this.panels.forEach(panel => {  //それぞれのパネルに対して、処理をしたいので forEach() で回してきます。
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0]; //そのうえで配置したい数値をランダムに選んであげます。どうするかというと、 nums から splice() を使ってランダムな位置から要素をひとつ取り出してあげればいいですね。では、ランダムな位置は、 Math.floor() と Math.random() で このように表現してあげます。そのうえでひとつ取り出したいので、 1 としてあげましょう。
        panel.activate(num); //それぞれのパネルは panel で取得できているので、 panel のほうにも activate するという意味で、同名のメソッドを作ってあげることにして、とりあえずこちらで呼び出していきましょう。配置する数値を渡したいのですが、あとでランダムにしていくのですが、とりあえず全部 0 で作ってみましょう。
      }); //あとは、この num を panel.activate() に渡してあげれば、こちらの数値からランダムな数値がひとつずつ選ばれて、パネルに反映されていくはずです。
    }
  }

  function runTimer() { //どうするかというと、まずはタイマー要素を取得していきましょう
    const timer = document.getElementById('timer'); //id を振っておいたので、 getElementById('timer') でいいですね。
    timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2); //そのうえで、その中身を更新してあげればいいので、現在の時刻から START ボタンを押したときの時刻を引いてあげるのですが、ミリ秒単位なので 1000 で割ってあげて、小数点以下 2 桁までを表示するために toFixed() を使ってあげましょう。

    timeoutId = setTimeout(() => {  //あとは setTimeout() で この runTimer() 自身を呼び出していけばいいので、 10 ミリ秒後に呼び出す、と書いてあげましょう。
      runTimer();
    }, 10);
  }

  const board = new Board();  //const board = new Board(); でいいですね。

  let currentNum = 0;  //まずは、今押し込むべき数値を currentNum で保持しておきたいと思います。最初は 0 でいいですね
  let startTime;
  let timeoutId;  //では、タイマーを止めるための setTimeout() の返り値が必要なので、変数を宣言しておきます。

  const btn = document.getElementById('btn'); //では document.getElementById('btn') で btn 要素を取得してあげて、そのうえで addEventListener() としてあげましょう。
  btn.addEventListener('click', () => {  //では、クリックしたら次の処理をしてね、と書いていきます。
    board.activate(); //こちらではゲームが始まるようにしたいので、 board に activate() というメソッドをあとで作ることにして、それをここで呼び出してあげましょう。

    startTime = Date.now(); //では startTime という変数を宣言しつつ、ボタンを押したときの現在時刻を保持しておきたいので、このあたりで startTime = Date.now(); と書いてあげればいいでしょう。
    runTimer(); //あとはタイマーを走らせればいいので、 runTimer() という関数を作っていきます。
  });
}