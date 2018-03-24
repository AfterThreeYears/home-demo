function imgLoader(url, cb) {
  return () => new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      cb(img);
      resolve();
    }
  });
}

function sequenceTasks(tasks) {
  var arr = [];
  return tasks.reduce(function (promise, task) {
      return promise.then(task).then((data) => {
        console.log(data);
        arr.push(data);
        return arr;
      });
  }, Promise.resolve());
}

;(() => {
  const activity = {
    init() {
      this.generateCanvas();
      this.renderCanvas();
      this.headerMove();
      this.bindEvent();
    },
    generateCanvas() {
      console.log('resize');
      this.canvas = document.querySelector('.canvas');
      this.ctx = this.canvas.getContext('2d');
      this.bodyWidth = $('body').width();
      this.canvas.width = this.bodyWidth;
      this.canvas.height = 600;
      this.arr = [{
        url: '../resources/images/banner.png',
        callback: (img) => {
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        },
      }, {
        url: '../resources/images/banner2.png',
        callback: (img) => {
          console.log('话');
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        },
      }, {
        url: '../resources/images/bird.png',
        callback: (img) => {
          var width = img.width;
          var height = img.height;
          this.ctx.drawImage(img, this. bodyWidth - width - 50, 100, width, height); 
        },
      }];
    },
    renderCanvas() {
      sequenceTasks(this.arr.map(function(item) {
        return imgLoader(item.url, item.callback);
      }));
    },
    headerMove() {
      var list = $('.activityHome-header-list');
      var li = $('.activityHome-header-list li');
      var line = $('.activityHome-header-list-line');
      const wrap = $('.activityHome-header-list-wrap');
      list.mouseover((event) => {
        var target = $(event.target);
        var index = target.data('index');
        if (typeof index === 'undefined') return;
        const left = target.offset().left - wrap.offset().left;
        line.css('left', left);
        li.removeClass('activityHome-header-item-current');
        var textWidth = target.width();
        line.width(textWidth);
        $(li[index]).addClass('activityHome-header-item-current');
      });
    },
    bindEvent() {
      addEventListener('resize', () => {
        this.generateCanvas();
        this.renderCanvas();
      }, false);
    }
  };
  activity.init();
})();