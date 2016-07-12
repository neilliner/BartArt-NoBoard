!function(a,b){MOTION=function(a,b){this._name="",this._playTime=0,this._time=0,this._duration="undefined"==typeof a?0:a,this._delayTime="undefined"==typeof b?0:b,this._repeatTime=0,this._repeatDuration=0,this._reverseTime=0,this._timeScale=1,this._isPlaying=!1,this._isRepeating=!1,this._isRepeatingDelay=!1,this._isReversing=!1,this._isSeeking=!1,this._hasController=!1,this._useOnce=MOTION._useOnce,this._onStart=null,this._onEnd=null,this._onUpdate=null,this._onRepeat=null,MOTION._add(this)},MOTION.REVISION="1",MOTION.ABSOLUTE="absolute",MOTION.RELATIVE="relative",MOTION.LINEAR="linear",MOTION.COSINE="cosine",MOTION.CUBIC="cubic",MOTION.HERMITE="hermite",MOTION._motions=[],MOTION._performance=typeof a!==b&&a.performance!==b&&a.performance.now!==b?a.performance:Date,MOTION._useOnce=!1,MOTION._time=0,MOTION._valueMode=MOTION.ABSOLUTE,MOTION.valueMode=function(a){MOTION._valueMode=a},MOTION.playAll=function(){for(var a=0;a<MOTION._motions.length;a++)MOTION._motions[a].play()},MOTION.stopAll=function(){for(var a=0;a<MOTION._motions.length;a++)MOTION._motions[a].stop()},MOTION.resumeAll=function(){for(var a=0;a<MOTION._motions.length;a++)MOTION._motions[a].resume()},MOTION.pauseAll=function(){for(var a=0;a<MOTION._motions.length;a++)MOTION._motions[a].pause()},MOTION.seekAll=function(a){for(var b=0;b<MOTION._motions.length;b++)MOTION._motions[b].seek(a)},MOTION.repeatAll=function(a){for(var b=0;b<MOTION._motions.length;b++)MOTION._motions[b].repeat(a)},MOTION.reverseAll=function(){for(var a=0;a<MOTION._motions.length;a++)MOTION._motions[a].reverse()},MOTION.timeScaleAll=function(a){for(var b=0;b<MOTION._motions.length;b++)MOTION._motions[b].timeScale(a)},MOTION.useOnce=function(a){MOTION._useOnce="undefined"!=typeof a?a:!0;for(var b=0;b<MOTION._motions.length;b++)MOTION._motions[b].useOnce(MOTION._useOnce)},MOTION._add=function(a){MOTION._motions.push(a)},MOTION.remove=function(a){var b=MOTION._motions.indexOf(a);MOTION._motions.splice(b,1)},MOTION.removeAll=function(){MOTION._motions=[]},MOTION.update=function(a){if("undefined"==typeof a)return!1;MOTION._time=typeof a!==b?a:this._performance.now();for(var c=0;c<MOTION._motions.length;c++)MOTION._motions[c]._update()},MOTION.autoUpdate=function(){return _isAutoUpdating=!0,this},MOTION.noAutoUpdate=function(){return _isAutoUpdating=!1,this},MOTION.time=function(){return MOTION._time},MOTION.isPlaying=function(){for(var a=0;a<MOTION._motions.length;a++)if(MOTION._motions[a].isPlaying())return!0;return!1},MOTION.prototype.constructor=MOTION,MOTION.prototype.play=function(){return this.dispatchStartedEvent(),this.seek(0),this.resume(),this._repeatTime=0,this},MOTION.prototype.stop=function(){return this.seek(1),this.pause(),this._repeatTime=0,this.dispatchEndedEvent(),!this._useOnce||this._hasController?this:void MOTION.remove(this)},MOTION.prototype.pause=function(){return this._isPlaying=!1,this._playTime=this._time,this},MOTION.prototype.resume=function(){return this._isPlaying=!0,this._playTime=MOTION._time-this._playTime,this},MOTION.prototype.seek=function(a){return this._isPlaying=!1,this._isSeeking=!0,this._playTime=(this._delayTime+this._duration)*a,this.setTime(this._playTime),this.dispatchChangedEvent(),this._isSeeking=!1,this},MOTION.prototype.repeat=function(a){return this._isRepeating=!0,this._repeatDuration="undefined"!=typeof a?a:0,this},MOTION.prototype.noRepeat=function(){return this._isRepeating=!1,this._repeatDuration=0,this},MOTION.prototype.reverse=function(){return this._isReversing=!0,this},MOTION.prototype.noReverse=function(){return this._isReversing=!1,this},MOTION.prototype._update=function(a){this._isPlaying&&("undefined"==typeof a?this._updateTime():this.setTime(a),this.dispatchChangedEvent(),this._isInsidePlayingTime(this._time)||this._isInsideDelayingTime(this._time)||(this._reverseTime=0===this._reverseTime?this._duration:0,this._isRepeating&&(0===this._repeatDuration||this._repeatTime<this._repeatDuration)?(this.seek(0),this.resume(),this._repeatTime++,this._isRepeatingDelay||(this._delayTime=0),this.dispatchRepeatedEvent()):this.stop()))},MOTION.prototype._updateTime=function(){this._time=(MOTION._time-this._playTime)*this._timeScale,this._isReversing&&0!==this._reverseTime&&(this._time=this._reverseTime-this._time)},MOTION.prototype.setName=function(a){return this._name=a,this},MOTION.prototype.name=MOTION.prototype.setName,MOTION.prototype.getName=function(){return this._name},MOTION.prototype.setTime=function(a){return this._time=a*this._timeScale,this._isReversing&&0!==this._reverseTime&&(this._time=this._reverseTime-this._time),this},MOTION.prototype.getTime=function(){return this._time<this._delayTime?0:this._time-this._delayTime},MOTION.prototype.time=MOTION.prototype.getTime,MOTION.prototype.setTimeScale=function(a){return this._timeScale=a,this},MOTION.prototype.timeScale=MOTION.prototype.setTimeScale,MOTION.prototype.getTimeScale=function(){return this._timeScale},MOTION.prototype.getPosition=function(){return this.getTime()/this._duration},MOTION.prototype.position=MOTION.prototype.getPosition,MOTION.prototype.setDuration=function(a){return this._duration=a,this},MOTION.prototype.getDuration=function(){return this._duration},MOTION.prototype.duration=MOTION.prototype.getDuration,MOTION.prototype.getRepeatTime=function(){return this._repeatTime},MOTION.prototype.repeatTime=MOTION.prototype.getRepeatTime,MOTION.prototype.setDelay=function(a){return this._delayTime=a,this},MOTION.prototype.delay=MOTION.prototype.setDelay,MOTION.prototype.noDelay=function(){return this._delayTime=0,this},MOTION.prototype.getDelay=function(){return this._delayTime},MOTION.prototype.repeatDelay=function(a){return this.repeat(a),this._isRepeatingDelay=!0,this},MOTION.prototype.noRepeatDelay=function(){return this.noRepeat(),this._isRepeatingDelay=!1,this},MOTION.prototype.isDelaying=function(){return this._time<=this._delayTime},MOTION.prototype.isPlaying=function(){return this._isPlaying},MOTION.prototype._isInsideDelayingTime=function(a){return a>=0&&a<this._delayTime},MOTION.prototype._isInsidePlayingTime=function(a){return a>=this._delayTime&&a<this._delayTime+this._duration},MOTION.prototype._isAbovePlayingTime=function(a){return a>=this._delayTime+this._duration},MOTION.prototype.useOnce=function(a){return this._useOnce="undefined"!=typeof a?a:!0,this},MOTION._map=function(a,b,c,d,e){return(a-b)/(c-b)*(e-d)+d},MOTION.prototype.onStart=function(a){return this._onStart=a,this},MOTION.prototype.onEnd=function(a){return this._onEnd=a,this},MOTION.prototype.onUpdate=function(a){return this._onUpdate=a,this},MOTION.prototype.onRepeat=function(a){return this._onRepeat=a,this},MOTION.prototype.dispatchStartedEvent=function(){this._onStart&&this._onStart()},MOTION.prototype.dispatchEndedEvent=function(){this._onEnd&&this._onEnd()},MOTION.prototype.dispatchChangedEvent=function(){this._onUpdate&&this._onUpdate()},MOTION.prototype.dispatchRepeatedEvent=function(){this._onRepeat&&this._onRepeat()},a.MOTION=MOTION,"function"!=typeof Object.create&&(Object.create=function(){var a=function(){};return function(b){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof b)throw TypeError("Argument must be an object");a.prototype=b;var c=new a;return a.prototype=null,c}}())}(window),function(a,b){a.Easing=function(){},a.Easing.Quad=function(){},a.Easing.Quad.In=function(a){return(a/=1)*a},a.Easing.Quad.Out=function(a){return-(a/=1)*(a-2)},a.Easing.Quad.InOut=function(a){return(a/=.5)<1?.5*a*a:-.5*(--a*(a-2)-1)},a.Easing.Cubic=function(){},a.Easing.Cubic.In=function(a){return(a/=1)*a*a},a.Easing.Cubic.Out=function(a){return(a=a/1-1)*a*a+1},a.Easing.Cubic.InOut=function(a){return(a/=.5)<1?.5*a*a*a:.5*((a-=2)*a*a+2)},a.Easing.Quart=function(){},a.Easing.Quart.In=function(a){return(a/=1)*a*a*a},a.Easing.Quart.Out=function(a){return-((a=a/1-1)*a*a*a-1)},a.Easing.Quart.InOut=function(a){return(a/=.5)<1?.5*a*a*a*a:-.5*((a-=2)*a*a*a-2)},a.Easing.Quint=function(){},a.Easing.Quint.In=function(a){return(a/=1)*a*a*a*a},a.Easing.Quint.Out=function(a){return(a=a/1-1)*a*a*a*a+1},a.Easing.Quint.InOut=function(a){return(a/=.5)<1?.5*a*a*a*a*a:.5*((a-=2)*a*a*a*a+2)},a.Easing.Sine=function(){},a.Easing.Sine.In=function(a){return-Math.cos(a/1*(Math.PI/2))+1},a.Easing.Sine.Out=function(a){return Math.sin(a/1*(Math.PI/2))},a.Easing.Sine.InOut=function(a){return-.5*(Math.cos(Math.PI*a/1)-1)},a.Easing.Expo=function(){},a.Easing.Expo.In=function(a){return 0==a?0:Math.pow(2,10*(a/1-1))},a.Easing.Expo.Out=function(a){return 1==a?1:-Math.pow(2,-10*a/1)+1},a.Easing.Expo.InOut=function(a){return 0==a?0:1==a?1:(a/=.5)<1?.5*Math.pow(2,10*(a-1)):.5*(-Math.pow(2,-10*--a)+2)},a.Easing.Circ=function(){},a.Easing.Circ.In=function(a){return-(Math.sqrt(1-(a/=1)*a)-1)},a.Easing.Circ.Out=function(a){return Math.sqrt(1-(a=a/1-1)*a)},a.Easing.Circ.InOut=function(a){return(a/=.5)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)},a.Easing.Elastic=function(){},a.Easing.Elastic.In=function(a){var b=1.70158,c=0,d=1;if(0==a)return 0;if(1==(a/=1))return 1;if(c||(c=.3),d<Math.abs(1)){d=1;var b=c/4}else var b=c/(2*Math.PI)*Math.asin(1/d);return-(d*Math.pow(2,10*(a-=1))*Math.sin(2*(a-b)*Math.PI/c))},a.Easing.Elastic.Out=function(a){var b=1.70158,c=0,d=1;if(0==a)return 0;if(1==(a/=1))return 1;if(c||(c=.3),d<Math.abs(1)){d=1;var b=c/4}else var b=c/(2*Math.PI)*Math.asin(1/d);return d*Math.pow(2,-10*a)*Math.sin(2*(a-b)*Math.PI/c)+1},a.Easing.Elastic.InOut=function(a){var b=1.70158,c=0,d=1;if(0==a)return 0;if(2==(a/=.5))return 1;if(c||(c=.3*1.5),d<Math.abs(1)){d=1;var b=c/4}else var b=c/(2*Math.PI)*Math.asin(1/d);return 1>a?-.5*d*Math.pow(2,10*(a-=1))*Math.sin(2*(a-b)*Math.PI/c):d*Math.pow(2,-10*(a-=1))*Math.sin(2*(a-b)*Math.PI/c)*.5+1},a.Easing.Back=function(){},a.Easing.Back.In=function(a,c){return c==b&&(c=1.70158),(a/=1)*a*((c+1)*a-c)},a.Easing.Back.Out=function(a,c){return c==b&&(c=1.70158),(a=a/1-1)*a*((c+1)*a+c)+1},a.Easing.Back.InOut=function(a,c){return c==b&&(c=1.70158),(a/=.5)<1?.5*a*a*(((c*=1.525)+1)*a-c):.5*((a-=2)*a*(((c*=1.525)+1)*a+c)+2)},a.Easing.Bounce=function(){},a.Easing.Bounce.In=function(b){return 1-a.Easing.Bounce.Out(1-b,0)},a.Easing.Bounce.Out=function(a){return(a/=1)<1/2.75?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},a.Easing.Bounce.InOut=function(b){return.5>b?.5*a.Easing.Bounce.In(2*b,0):.5*a.Easing.Bounce.Out(2*b-1,0)+.5},a.Quad=a.Easing.Quad,a.Cubic=a.Easing.Cubic,a.Quart=a.Easing.Quart,a.Quint=a.Easing.Quint,a.Sine=a.Easing.Sine,a.Expo=a.Easing.Expo,a.Circ=a.Easing.Circ,a.Elastic=a.Easing.Elastic,a.Back=a.Easing.Back,a.Bounce=a.Easing.Bounce}(MOTION),function(a,b){a.Interoplation=function(){},a.Interoplation.Linear=function(a,b,c){return b instanceof Array&&(c=b[2],b=b[1]),b*(1-a)+c*a},a.Interoplation.Cosine=function(a,b,c){b instanceof Array&&(c=b[2],b=b[1]);var d=(1-PApplet.cos(a*PConstants.PI))/2;return b*(1-d)+c*d},a.Interoplation.Cubic=function(a,b,c,d,e){b instanceof Array&&(c=b[1],d=b[2],e=b[3],b=b[0]);var f,g,h,i,j;return j=a*a,f=e-d-b+c,g=b-c-f,h=d-b,i=c,f*a*j+g*j+h*a+i},a.Interoplation.Hermite=function(a,c,d,e,f,g,h){g==b&&(g=0),h==b&&(h=0),c instanceof Array&&(d=c[1],e=c[2],f=c[3],c=c[0]);var i,j,k,l,m,n,o,p;return k=a*a,l=k*a,i=(d-c)*(1+h)*(1-g)/2,i+=(e-d)*(1-h)*(1-g)/2,j=(e-d)*(1+h)*(1-g)/2,j+=(f-e)*(1-h)*(1-g)/2,m=2*l-3*k+1,n=l-2*k+a,o=l-k,p=-2*l+3*k,m*d+n*i+o*j+p*e},a.Interoplation.getInterpolationAt=function(c,d,e){e==b&&(e=a.Interoplation.Hermite);var f,g,h,i,j=1/d.length,k=Math.floor(a._map(c,0,1,0,d.length)),l=a._map(c,k*j,(k+1)*j,0,1),j=1/d.length,k=Math.floor(a._map(c,0,1,0,d.length));if(g=d[k],h=d[k+1],0==k){var m=d[0],n=d[1],o=n-m;f=n-o}else f=d[k-1];if(k==d.length-2){var m=d[d.length-2],n=d[d.length-1],o=n-m;i=n+o}else i=d[k+2];return e(l,[f,g,h,i])}}(MOTION),function(a){a.MotionController=function(b){a.call(this),this._motions=[],this._valueMode=null,b&&this.addAll(b)},a.MotionController.prototype=Object.create(a.prototype),a.MotionController.prototype.constructor=a.MotionController,a.MotionController.prototype.reverse=function(){a.prototype.reverse.call(this);for(var b=0;b<this._motions.length;b++)this._motions[b].reverse();return this},a.MotionController.prototype._updateMotions=function(){for(var b=0;b<this._motions.length;b++){var c=this._motions[b];this._isSeeking?c.seek(c._isInsidePlayingTime(this.getTime())?a._map(this.getTime(),0,c.getDelay()+c.getDuration(),0,1):c._isAbovePlayingTime(this.getTime())?1:0):c._isInsidePlayingTime(this.getTime())?c.isPlaying()?c._update(this.getTime(),!1):c.play():c.isPlaying()&&c.stop()}},a.MotionController.prototype._updateDuration=function(){for(var a=0;a<this._motions.length;a++)this._duration=Math.max(this._duration,this._motions[a].getDelay()+this._motions[a].getDuration())},a.MotionController.prototype.getPosition=function(){return this.getTime()/this._duration},a.MotionController.prototype.get=function(){if("number"==typeof arguments[0])return this._motions[arguments[0]];if("string"==typeof arguments[0])for(var a=0;a<this._motions.length;a++)if(this._motions[a]._name===arguments[0])return this._motions[a];return this._motions},a.MotionController.prototype.getFirst=function(){return this._motions[0]},a.MotionController.prototype.first=a.MotionController.prototype.getFirst,a.MotionController.prototype.getLast=function(){return this._motions[this._motions.length]},a.MotionController.prototype.last=a.MotionController.prototype.getLast,a.MotionController.prototype.getCount=function(){return this._motions.length},a.MotionController.prototype.count=a.MotionController.prototype.getCount,a.MotionController.prototype.setEasing=function(b){this._easing="undefined"==typeof b?function(a){return a}:b;for(var c=0;c<this._motions.length;c++)this._motions[c]instanceof a.Tween&&this._motions[c].easing(this._easing);return this},a.MotionController.prototype.easing=a.MotionController.prototype.setEasing,a.MotionController.prototype.getEasing=function(){return this._easing},a.MotionController.prototype.add=function(a){return this.insert(a,0),this},a.MotionController.prototype.insert=function(b,c){return b.delay(c),b._hasController=!0,this._motions.push(b),a.remove(b),this._updateDuration(),this},a.MotionController.prototype.remove=function(a){var b;if("number"==typeof arguments[0])b=arguments[0];else if("string"==typeof arguments[0])for(var c=0;c<this._motions.length;c++)this._motions[c]._name===arguments[0]&&(a=this._motions[c]);else"object"==typeof arguments[0]&&(b=this._motions.indexOf(a));return-1!=b&&(this._motions.splice(b,1),this._updateDuration()),this},a.MotionController.prototype.addAll=function(a){for(var b=0;b<a.length;b++)this.add(a[b]);return this},a.MotionController.prototype.removeAll=function(){for(var a=0;a<this._motions.length;a++)this.remove(this._motions[a]);return this},a.MotionController.prototype.dispatchChangedEvent=function(){this._updateMotions(),a.prototype.dispatchChangedEvent.call(this)}}(MOTION),function(a){a.Parallel=function(b){a.MotionController.call(this,name,b)},a.Parallel.prototype=Object.create(a.MotionController.prototype),a.Parallel.prototype.constructor=a.Parallel,a.Parallel.prototype._updateMotions=function(){for(var b=0;b<this._motions.length;b++){var c=this._motions[b];if(this._isSeeking)c.seek(c._isInsidePlayingTime(this.getTime())?a._map(this.getTime(),0,c.getDelay()+c.getDuration(),0,1):c._isAbovePlayingTime(this.getTime())?1:0);else if(c._isInsidePlayingTime(this.getTime()))c.isPlaying()?c._update(this.getTime(),!1):c.play();else if(c.isPlaying())if(this._isReversing&&b<this._motions.length-1)c.seek(1);else for(var b=0;b<this._motions.length;b++)this._motions[b].stop()}}}(MOTION),function(a){a._properties=[],a.Property=function(b,c,d){this._object="object"==typeof arguments[0]?b:window,this._field="string"==typeof arguments[1]?c:arguments[0],this._order=a._properties.filter(function(a){return a._object==this._object&&a._field==this._field},this).length,this._isArray=!1,this._isPath=!1;var d="string"==typeof arguments[1]?d:arguments[1];d instanceof Array?2==d.length?(this._start=d[0],this._end=d[1],this._isArray=d[0]instanceof Array&&d[1]instanceof Array):this._object[this._field]instanceof Array?(this._start=0==this._object[this._field].length?new Array(d.length):this._object[this._field],this._end=d,this._isArray=!0):(this._start=d[0],this._end=d,this._isPath=!0):(this._start="undefined"==typeof this._object[this._field]?0:this._object[this._field],this._end=d),a._properties.push(this)},a.Property.prototype.update=function(b,c,d){if(this._isArray){for(var e=[],f=0;f<this._start.length;f++)e.push(a.Interoplation.Linear(c(b),this._start[f],this._end[f]));this._object[this._field]=e}else this._object[this._field]=this._isPath?a.Interoplation.getInterpolationAt(c(b),this._end,d):a.Interoplation.Linear(c(b),this._start,this._end)},a.Property.prototype.getStart=function(){return this._start},a.Property.prototype.setStart=function(a){return this._start="undefined"==typeof a?"undefined"==typeof this._object[this._field]?0:this._object[this._field]:a,this},a.Property.prototype.start=a.Property.prototype.setStart,a.Property.prototype.getEnd=function(){return this._end},a.Property.prototype.setEnd=function(a){return this._end=a,this},a.Property.prototype.end=a.Property.prototype.setEnd,a.Property.prototype.getValue=function(){return this._object[this._field]},a.Property.prototype.value=a.Property.prototype.getValue}(MOTION),function(a){a.Sequence=function(b){a.MotionController.call(this,b),this._current=null,this._currentIndex=0},a.Sequence.prototype=Object.create(a.MotionController.prototype),a.Sequence.prototype.constructor=a.Sequence,a.Sequence.prototype.add=function(b){return a.MotionController.prototype.insert.call(this,b,this._duration),this},a.Sequence.prototype.getCurrentIndex=function(){return this._currentIndex},a.Sequence.prototype.currentIndex=a.Sequence.prototype.getCurrentIndex,a.Sequence.prototype.getCurrent=function(){return this._current},a.Sequence.prototype.current=a.Sequence.prototype.getCurrent,a.MotionController.prototype.dispatchStartedEvent=function(){this._current=null,this._currentIndex=0,a.prototype.dispatchStartedEvent.call(this)},a.MotionController.prototype.dispatchChangedEvent=function(){if(this._updateMotions(),this._isPlaying)for(var b=0;b<this._motions.length;b++){var c=this._motions[b];if(c._isInsidePlayingTime(this._time)){this._currentIndex=b,this._current=c;break}}a.prototype.dispatchChangedEvent.call(this)},a.MotionController.prototype.dispatchRepeatedEvent=function(){this._current=null,this._currentIndex=0,a.prototype.dispatchRepeatedEvent.call(this)}}(MOTION),function(a){a.Keyframe=function(b,c){a.MotionController.call(this,c),this.delay(b)},a.Keyframe.prototype=Object.create(a.MotionController.prototype),a.Keyframe.prototype.constructor=a.Keyframe,a.Timeline=function(){a.MotionController.call(this)},a.Timeline.prototype=Object.create(a.MotionController.prototype),a.Timeline.prototype.constructor=a.Timeline,a.Timeline.prototype.play=function(){if("undefined"==typeof arguments[0])a.MotionController.prototype.play.call(this);else if("number"==typeof arguments[0])this.seek(arguments[0]/this._duration),this.resume();else if("string"==typeof arguments[0])for(var b=0;b<this._motions.length;b++)this._motions[b]._name===arguments[0]&&(this.seek(this._motions[b]/this._duration),this.resume());else"object"==typeof arguments[0]&&(this.seek(arguments[0].getPlayTime()/this._duration),this.resume());return this},a.Timeline.prototype.stop=function(){if("undefined"==typeof arguments[0])a.MotionController.prototype.stop.call(this);else if("number"==typeof arguments[0])this.seek(arguments[0]/this._duration),this.pause();else if("string"==typeof arguments[0])for(var b=0;b<this._motions.length;b++)this._motions[b]._name===arguments[0]&&(this.seek(this._motions[b]/this._duration),this.pause());else"object"==typeof arguments[0]&&(this.seek(arguments[0].getPlayTime()/this._duration),this.pause());return this},a.Timeline.prototype.add=function(b,d){if(b instanceof a.Keyframe)"undefined"==typeof d?this.insert(b,b.getDelay()):this.insert(b,d);else if("undefined"==typeof d)this._motions[this._motions.indexOf(c)]=c;else{var e=new a.Keyframe(d+"");e.add(b),this.insert(e,d)}return this},a.Timeline.prototype.getCurrent=function(){for(var a=[],b=0;b<this._motions.length;b++)this._motions[b].isInsidePlayingTime(this.getTime())&&a.push(this._motions[b]);return 0==a.length?null:a},a.Timeline.prototype.current=a.Timeline.prototype.getCurrent}(MOTION),function(a){a.Tween=function(){this._properties=[],this._easing=function(a){return a},this._interpolation=a.Interoplation.Hermite,"object"==typeof arguments[0]?(a.call(this,arguments[3],arguments[4]),this.addProperty(arguments[0],arguments[1],arguments[2]),"undefined"!=typeof arguments[5]&&this.setEasing(arguments[5])):"string"==typeof arguments[0]?(a.call(this,arguments[2],arguments[3]),this.addProperty(arguments[0],arguments[1]),"undefined"!=typeof arguments[4]&&this.setEasing(arguments[4])):(a.call(this,arguments[0],arguments[1]),"undefined"!=typeof arguments[2]&&this.setEasing(arguments[2]))},a.Tween.prototype=Object.create(a.prototype),a.Tween.prototype.constrctor=a.Tween,a.Tween.prototype._updateProperties=function(){for(var a=0;a<this._properties.length;a++)this._properties[a].update(this.position(),this._easing,this._interpolation)},a.Tween.prototype.addProperty=function(b,c,d){return this._properties.push(arguments[0]instanceof a.Property?arguments[0]:"object"==typeof arguments[0]?new a.Property(b,c,d):new a.Property(arguments[0],arguments[1])),this},a.Tween.prototype.add=a.Tween.prototype.addProperty,a.Tween.prototype.remove=function(){var a;if("number"==typeof arguments[0])a=arguments[0];else if("name"==typeof arguments[0])a=this._properties.indexOf(property);else if("object"==typeof arguments[0])for(var b=0;b<this._properties.length;b++)this._properties[b]._field===arguments[0]&&(b=a);return a&&-1!=a&&this._properties.splice(a,1),this},a.Tween.prototype.getProperty=function(){if("string"!=typeof arguments[0])return"number"==typeof arguments[0]?this._properties[arguments[0]]:this._properties;for(var a=0;a<this._properties.length;a++)if(this._properties[a]._field===arguments[0])return this._properties[a]},a.Tween.prototype.get=a.Tween.prototype.getProperty,a.Tween.prototype.getFirstProperty=function(){return this._properties[0]},a.Tween.prototype.first=a.Tween.prototype.getFirstProperty,a.Tween.prototype.getLastProperty=function(){return this._properties[this._properties.length]},a.Tween.prototype.last=a.Tween.prototype.getLastProperty,a.Tween.prototype.getCount=function(){return this._properties.length},a.Tween.prototype.count=a.Tween.prototype.getCount,a.Tween.prototype.setEasing=function(a){return this._easing=a,this},a.Tween.prototype.easing=a.Tween.prototype.setEasing,a.Tween.prototype.getEasing=function(){return this._easing},a.Tween.prototype.noEasing=function(){return this._easing=function(a){return a},this},a.Tween.prototype.setInterpolation=function(a){return this._interpolation=a,this},a.Tween.prototype.interpolation=a.Tween.prototype.setInterpolation,a.Tween.prototype.getInterpolation=function(){return this._interpolation},a.Tween.prototype.relative=function(){return this.setValueMode(a.RELATIVE),this},a.Tween.prototype.absolute=function(){return this.setValueMode(a.ABSOLUTE),this},a.Tween.prototype.setValueMode=function(a){return this._valueMode=a,this},a.Tween.prototype.valueMode=a.Tween.prototype.setValueMode,a.Tween.prototype.getValueMode=function(){return this._valueMode},a.Tween.prototype.dispatchStartedEvent=function(){if(this._valueMode==a.RELATIVE)for(var b=0;b<this._properties.length;b++)this._properties[b].setStart();this._onStart&&this._onStart(this._object)},a.Tween.prototype.dispatchEndedEvent=function(){this._onEnd&&this._onEnd(this._object)},a.Tween.prototype.dispatchChangedEvent=function(){this._updateProperties(),this._onUpdate&&this._onUpdate(this._object)},a.Tween.prototype.dispatchRepeatedEvent=function(){this._onRepeat&&this._onRepeat(this._object)}}(MOTION);