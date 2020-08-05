import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonRange } from '@ionic/angular';

import { Howl } from 'howler';
import { Sound } from './sounds.model';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.page.html',
  styleUrls: ['./sounds.page.scss'],
})
export class SoundsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('range') range: IonRange;
  sounds: Sound[] = [
    {
      id: 'a',
      title: '水の音',
      description: '水の音を聞いて深い睡眠をしましょう。あなたは必ず眠ります。',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTULd0EDn_3hDPVtnPZJzEhEYhWGJEfSpbpMw&usqp=CAU',
      date: new Date('2020-07-25'),
      time: '5',
      path: './assets/mp3/bensound-creativeminds.mp3',
    },
    {
      id: 'b',
      title: '水の音2',
      description: '水の音を聞いて深い睡眠をしましょう。あなたは必ず眠ります。',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTULd0EDn_3hDPVtnPZJzEhEYhWGJEfSpbpMw&usqp=CAU',
      date: new Date('2020-07-25'),
      time: '3',
      path: './assets/mp3/bensound-summer.mp3',
    },
    {
      id: 'c',
      title: '水の音3',
      description: '水の音を聞いて深い睡眠をしましょう。あなたは必ず眠ります。',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTULd0EDn_3hDPVtnPZJzEhEYhWGJEfSpbpMw&usqp=CAU',
      date: new Date('2020-07-25'),
      time: '4',
      path: './assets/mp3/bensound-ukulele.mp3',
    },
  ];
  activeSound: Sound = null;
  isPlaying = false;
  player: Howl = null;
  progress = 0;

  constructor() {}

  start(sound: Sound) {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [sound.path],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeSound = sound;
        this.updateProgress();
      },
      onend: () => {},
    });
    this.player.play();
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    const index = this.sounds.indexOf(this.activeSound);
    if (index !== this.sounds.length - 1) {
      this.start(this.sounds[index + 1]);
    } else {
      this.start(this.sounds[0]);
    }
  }

  prev() {
    const index = this.sounds.indexOf(this.activeSound);
    if (index > 0) {
      this.start(this.sounds[index - 1]);
    } else {
      this.start(this.sounds[this.sounds.length - 1]);
    }
  }

  seek() {
    const newValue = +this.range.value;
    const duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    const seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }

  ngOnInit() {}

  getYMD(date: Date) {
    const dt = date;
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth() + 1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    const result = y + '/' + m + '/' + d;
    return result;
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.sounds.length >= 30) {
        this.toggleInfiniteScroll();
      } else {
        this.getData();
      }
    }, 500);
  }

  getData() {
    const sound = {
      id: 'c',
      title: '水の音',
      description: '水の音を聞いて深い睡眠をしましょう。あなたは必ず眠ります。',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTULd0EDn_3hDPVtnPZJzEhEYhWGJEfSpbpMw&usqp=CAU',
      date: new Date('2020-07-25'),
      time: '5',
      path: './assets/mp3/bensound-creativeminds.mp3',
    };
    const count = this.sounds.length + 1;
    for (let i = count; i < count + 15; i++) {
      this.sounds.push(sound);
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
