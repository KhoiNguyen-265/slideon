function Slideon(selector, options = {}) {
    this.contain = document.querySelector(selector);

    if (!this.contain) {
        console.error(`Slideon: Container "${selector}" not found!`);
        return;
    }

    this.opt = Object.assign(
        {
            items: 1,
            loop: true,
        },
        options
    );
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
        slide.style.flexBasis = `calc(100% / ${this.opt.items})`;
        this.track.appendChild(slide);
    });
    this.contain.appendChild(this.track);
};

Slideon.prototype._createNavigation = function () {
    this.prevBtn = document.createElement("button");
    this.nextBtn = document.createElement("button");

    this.prevBtn.textContent = "<";
    this.nextBtn.textContent = ">";

    this.prevBtn.classList.add("slideon-prev");
    this.nextBtn.classList.add("slideon-next");

    this.contain.append(this.prevBtn, this.nextBtn);

    this.prevBtn.onclick = () => this.moveSLide(-1);
    this.nextBtn.onclick = () => this.moveSLide(1);
};

Slideon.prototype.moveSLide = function (step) {
    if (this.opt.loop) {
        this.currentIndex =
            (this.currentIndex + step + this.slides.length) %
            this.slides.length;

        console.log(this.currentIndex);
    } else {
        this.currentIndex = Math.min(
            Math.max(this.currentIndex + step, 0),
            this.slides.length - this.opt.items
        );
    }

    this.offSet = -(this.currentIndex * 100) / this.opt.items;
    this.track.style.transform = `translateX(${this.offSet}%)`;
};
