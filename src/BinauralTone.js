import Tone from 'tone'

class BinauralTone {
	constructor(opts) {
		this.baseHz = opts['baseHz'] || 440;
    this.beatHz = opts['beatHz'] || 10;
    this.leftHz = this.baseHz - (this.beatHz / 2);
    this.rightHz = this.baseHz + (this.beatHz / 2);

    const lPan = new Tone.PanVol(-1, -20).toMaster();
    const rPan = new Tone.PanVol(1, -20).toMaster();
    const rTone = new Tone.Oscillator(this.rightHz, 'sine').connect(lPan);
    const lTone = new Tone.Oscillator(this.leftHz, 'sine').connect(rPan);

    this.tones = [lTone, rTone];

		// var noise = new Tone.Noise("pink").start();
		//
		// //make an autofilter to shape the noise
		// var autoFilter = new Tone.AutoFilter({
		// 	"frequency" : 12,
		// 	"depth" : 1,
		// 	"baseFrequency" : 200,
		// 	"octaves" : .05
		// }).connect(Tone.Master);
		//
		// //connect the noise
		// noise.connect(autoFilter);
		// //start the autofilter LFO
		// // autoFilter.start()
  }

	calculateLR = (baseHz, beatHz) => {
		const l = baseHz - (beatHz / 2),
					r = baseHz + (beatHz / 2);

		return [l, r];
		// return [l, r]
	}

	updateBeatHz = (beatHz) => {
		const toneHzLR = this.calculateLR(this.baseHz, beatHz);
		console.log(beatHz);
		this.tones.forEach((tone, i) => {
			tone.frequency.value = toneHzLR[i];
		});
	}

	updateBaseHz = (hz) => {
		this.baseHz = hz;
		this.updateBeatHz(this.beatHz);
  }

  start = () => {
		this.tones.forEach((tone) => {tone.start()});
  }

	stop = () => {
		this.tones.forEach((tone) => {tone.stop()});
	}

  // this is the callback which should be called every time
  // the beatHz or baseHz are updated. but those should only be updated
  // with the named methods, and never directly.
  updateLRHz = () => {

  }
}

export default BinauralTone;
