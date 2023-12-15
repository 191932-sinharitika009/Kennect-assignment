const canvas = document.getElementById('barCanvas');
const ctx = canvas.getContext('2d');
let bars = [];

let animationPaused = false;
let animationSpeed = 500; // Default speed

function randomizeArray() {
  bars = generateRandomBars();
  drawBars();
}

function applySorting(algorithm) {
  randomizeArray(); 

  switch (algorithm) {
    case 'insertion':
      insertionSort();
      break;
    case 'selection':
      selectionSort();
      break;
    case 'bubble':
      bubbleSort();
      break;
    case 'quick':
      quickSort(0, bars.length - 1);
      break;
    case 'merge':
      mergeSort(0, bars.length - 1);
      break;
    case 'shell':
      shellSort();
      break;
  }
}

function changeSize() {
  const barHeight = document.getElementById('barHeight').value || 50;
  const barWidth = document.getElementById('barWidth').value || 20;

  bars.forEach((bar) => {
    bar.height = barHeight;
    bar.width = barWidth;
  });

  drawBars();
}

function generateRandomBars() {
  const numberOfBars = 30;
  const maxBarHeight = 300;

  return Array.from({ length: numberOfBars }, () => ({
    height: Math.floor(Math.random() * maxBarHeight) + 1,
    width: 20, // Default width
  }));
}

function drawBars(highlightedBars = []) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bars.forEach((bar, index) => {
    const x = index * (bar.width + 5);
    const y = canvas.height - bar.height;

    ctx.fillStyle = highlightedBars.includes(index) ? '#e74c3c' : '#3498db';
    ctx.fillRect(x, y, bar.width, bar.height);

    ctx.strokeStyle = '#2980b9';
    ctx.strokeRect(x, y, bar.width, bar.height);

    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText(bar.height, x + bar.width / 2 - 6, y + bar.height + 15);
  });
}

// Insertion Sort
function insertionSort() {
  let n = bars.length;

  function sortStep(i) {
    if (i < n) {
      let key = bars[i];
      let j = i - 1;

      while (j >= 0 && bars[j].height > key.height) {
        bars[j + 1] = bars[j];
        j = j - 1;
      }

      bars[j + 1] = key;

      setTimeout(function () {
        drawBars([j + 1]); // Highlighting the bar that is changing
        sortStep(i + 1);
      }, animationSpeed);
    }
  }

  sortStep(1); 
}

// Selection Sort
function selectionSort() {
  let n = bars.length;

  let i = 0;
  let interval = setInterval(() => {
    if (i < n - 1) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (bars[j].height < bars[minIndex].height) {
          minIndex = j;
        }
      }

      let temp = bars[minIndex];
      bars[minIndex] = bars[i];
      bars[i] = temp;

      drawBars([i, minIndex]); // Highlighting the bars being swapped
      i++;
    } else {
      clearInterval(interval);
    }
  }, animationSpeed);
}

// Bubble Sort
function bubbleSort() {
  let n = bars.length;

  let i = 0;
  let j = 0;
  let interval = setInterval(() => {
    if (i < n - 1) {
      if (j < n - i - 1) {
        if (bars[j].height > bars[j + 1].height) {
          let temp = bars[j];
          bars[j] = bars[j + 1];
          bars[j + 1] = temp;
        }

        drawBars([j, j + 1]); // Highlighting the bars being compared
        j++;
      } else {
        j = 0;
        i++;
      }
    } else {
      clearInterval(interval);
    }
  }, animationSpeed);
}

// Quick Sort
function quickSort(low, high) {
  if (low < high) {
    let pi = partition(low, high);

    quickSort(low, pi - 1);
    quickSort(pi + 1, high);
  }
}

// Merge Sort
function mergeSort(low, high) {
  if (low < high) {
    let mid = Math.floor((low + high) / 2);

    mergeSort(low, mid);
    mergeSort(mid + 1, high);

    merge(low, mid, high);
  }
}

// Shell Sort
function shellSort() {
  let n = bars.length;
  let gap = Math.floor(n / 2);

  let interval = setInterval(() => {
    if (gap > 0) {
      for (let i = gap; i < n; i++) {
        let temp = bars[i];
        let j = i;

        while (j >= gap && bars[j - gap].height > temp.height) {
          bars[j] = bars[j - gap];
          j -= gap;
        }

        bars[j] = temp;
        drawBars([j, i]); // Highlighting the bars being compared
      }

      gap = Math.floor(gap / 2);
    } else {
      clearInterval(interval);
    }
  }, animationSpeed);
}

function toggleAnimation() {
  animationPaused = !animationPaused;

  if (!animationPaused) {
    animateSorting();
  }
}

function changeSpeed() {
  const speedSelector = document.getElementById('speedSelector');
  const selectedSpeed = speedSelector.value;

  switch (selectedSpeed) {
    case 'slow':
      animationSpeed = 1000;
      break;
    case 'medium':
      animationSpeed = 500;
      break;
    case 'fast':
      animationSpeed = 250;
      break;
  }
}

function animateSorting() {
  if (!animationPaused) {
    const selectedAlgorithm = document.getElementById('algorithmSelector').value;

    switch (selectedAlgorithm) {
      case 'insertion':
        insertionSort();
        break;
      case 'selection':
        selectionSort();
        break;
      case 'bubble':
        bubbleSort();
        break;
      case 'quick':
        quickSort(0, bars.length - 1);
        break;
      case 'merge':
        mergeSort(0, bars.length - 1);
        break;
      case 'shell':
        shellSort();
        break;
    }

    setTimeout(animateSorting, animationSpeed);
  }
}

randomizeArray();
