class AudioPlayer {
    volume: number;
    loop: boolean;
    src: string;
    audios: HTMLAudioElement[];

    constructor(volume: number) {
        this.volume = volume;
        this.audios = [];
    }

    play(name: string, loop: boolean) {
        let audio = new Audio(`./audio/${name}.mp3`);
        audio.loop = loop;
        audio.volume = this.volume;
        audio.play();
        this.audios.push(audio);
    }
    stop() {
        for (const audio of this.audios)
            audio.pause();
        this.audios = [];
    }
    changeVolume(volume: number) {
        this.volume = volume;
        for (const audio of this.audios)
            audio.volume = volume;
    }
}

export { AudioPlayer };