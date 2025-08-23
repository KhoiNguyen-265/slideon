function Slideon(selector, options = {}) {
    this.contain = document.querySelector(selector);

    if (!this.contain) {
        console.error(`Slideon: Container "${selector}" not found!`);
        return;
    }

    this.opt = Object.assign(
        {
            items: 1,
            speed: 300,
            loop: true,
        },
        options
    );
    this.slides = Array.from(this.contain.children);
    this.currentIndex = this.opt.loop ? this.opt.items : 0;

    this._init();
    this._updatePosition();
}

Slideon.prototype._init = function () {
    this.contain.classList.add("slideon-wrapper");

    this._createTrack();
    this._createNavigation();
};

Slideon.prototype._createTrack = function () {
    this.track = document.createElement("div");
    this.track.classList.add("slideon-track");

    if (this.opt.loop) {
        const cloneHead = this.slides
            .slice(-this.opt.items)
            .map((node) => node.cloneNode(true));
        const cloneTail = this.slides
            .slice(0, this.opt.items)
            .map((node) => node.cloneNode(true));

        this.slides = cloneHead.concat(this.slides.concat(cloneTail));
    }

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
    if (this._isAnimating) return;
    this._isAnimating = true;

    const maxIndex = this.slides.length - this.opt.items;
    this.currentIndex = Math.min(
        Math.max(this.currentIndex + step, 0),
        maxIndex
    );

    setTimeout(() => {
        if (this.opt.loop) {
            if (this.currentIndex <= 0) {
                this.currentIndex = maxIndex - this.opt.items;
            } else if (this.currentIndex >= maxIndex) {
                this.currentIndex = this.opt.items;
            }

            this._updatePosition(false);
        }
        this._isAnimating = false;
    }, this.opt.speed);

    this._updatePosition();
};

Slideon.prototype._updatePosition = function (instance = true) {
    this.offSet = -(this.currentIndex * 100) / this.opt.items;

    this.track.style.transition = instance
        ? `transform ${this.opt.speed}ms ease`
        : "none";
    this.track.style.transform = `translateX(${this.offSet}%)`;
};
