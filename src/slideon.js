function Slideon(selector, options = {}) {
    this.contain = document.querySelector(selector);

    if (!this.contain) {
        console.error(`Slideon: Container "${selector}" not found!`);
        return;
    }

    this.opt = Object.assign({}, options);
    this.slides = Array.from(this.contain.children);
    this.currentIndex = 0;

    this._init();
}

Slideon.prototype._init = function () {
    this.contain.classList.add("slideon-wrapper");

    this._createTrack();
    this._createNavigation();
};

Slideon.prototype._createTrack = function () {
    this.track = document.createElement("div");
    this.track.classList.add("slideon-track");

    this.slides.forEach((slide) => {
        slide.classList.add("slideon-slide");
        this.track.appendChild(slide);
    });

    this.contain.appendChild(this.track);
};

Slideon.prototype._createNavigation = function () {
    this.prevBtn = document.createElement("button");
    this.nextBtn = document.createElement("button");

    this.prevBtn.textContent = "<";
    this.nextBtn.textContent = ">";

    this.prevBtn.classList.add("slideon-prev", "disable");
    this.nextBtn.classList.add("slideon-next");

    this.contain.append(this.prevBtn, this.nextBtn);

    this.prevBtn.onclick = () => this.moveSLide(-1);
    this.nextBtn.onclick = () => this.moveSLide(1);
};

Slideon.prototype.moveSLide = function (step) {
    this.currentIndex = Math.min(
        Math.max(this.currentIndex + step, 0),
        this.slides.length - 3
    );
    this.offSet = -(this.currentIndex * 100) / 3;
    console.log(this.offSet);
    this.track.style.transform = `translateX(${this.offSet}%)`;

    if (this.offSet) {
        this.prevBtn.classList.remove("disable");
        this.nextBtn.classList.remove("disable");
    }

    if (!this.offSet) {
        this.prevBtn.classList.add("disable");
        this.nextBtn.classList.remove("disable");
    }

    if (this.offSet === -100) {
        this.nextBtn.classList.add("disable");
    }
};
