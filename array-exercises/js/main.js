document.addEventListener("DOMContentLoaded", function () {
  // Các phần tử DOM
  const numberInput = document.getElementById("numberInput");
  const realNumberInput = document.getElementById("realNumberInput");
  const currentArrayEl = document.getElementById("currentArray");
  const currentRealArrayEl = document.getElementById("currentRealArray");
  const functionSelect = document.getElementById("functionSelect");
  const resultEl = document.getElementById("result");
  const positionSwapArea = document.getElementById("positionSwapArea");
  const realArrayArea = document.getElementById("realArrayArea");
  const position1Input = document.getElementById("position1");
  const position2Input = document.getElementById("position2");
  const calculateButton = document.getElementById("calculateButton");

  // Mảng lưu trữ
  let numberArray = [];
  let realArray = [];

  // Thêm số vào mảng chính
  document.getElementById("addNumber").addEventListener("click", function () {
    const number = Number(numberInput.value);

    if (numberInput.value.trim() === "" || isNaN(number)) {
      alert("Vui lòng nhập một số hợp lệ!");
      return;
    }

    numberArray.push(number);
    updateArrayDisplay();
    numberInput.value = "";
    numberInput.focus();
  });

  // Thêm số vào mảng thực
  document
    .getElementById("addRealNumber")
    .addEventListener("click", function () {
      const number = Number(realNumberInput.value);

      if (realNumberInput.value.trim() === "" || isNaN(number)) {
        alert("Vui lòng nhập một số hợp lệ!");
        return;
      }

      realArray.push(number);
      updateRealArrayDisplay();
      realNumberInput.value = "";
      realNumberInput.focus();
    });

  // Hiển thị mảng hiện tại
  function updateArrayDisplay() {
    currentArrayEl.textContent =
      numberArray.length > 0 ? `[ ${numberArray.join(", ")} ]` : "[ ]";
  }

  // Hiển thị mảng số thực
  function updateRealArrayDisplay() {
    currentRealArrayEl.textContent =
      realArray.length > 0 ? `[ ${realArray.join(", ")} ]` : "[ ]";
  }

  // Khi thay đổi chức năng được chọn
  functionSelect.addEventListener("change", function () {
    // Ẩn tất cả các vùng nhập đặc biệt
    positionSwapArea.classList.add("d-none");
    realArrayArea.classList.add("d-none");

    const selectedFunction = functionSelect.value;

    // Hiển thị vùng nhập phù hợp với chức năng
    if (selectedFunction === "swapPosition") {
      positionSwapArea.classList.remove("d-none");
    } else if (selectedFunction === "addRealArray") {
      realArrayArea.classList.remove("d-none");
    }
  });

  // Xử lý khi nhấn nút thực hiện
  calculateButton.addEventListener("click", function () {
    const selectedFunction = functionSelect.value;

    if (!selectedFunction) {
      alert("Vui lòng chọn một chức năng!");
      return;
    }

    if (numberArray.length === 0 && selectedFunction !== "addRealArray") {
      alert("Vui lòng thêm ít nhất một số vào mảng!");
      return;
    }

    let result = "";

    switch (selectedFunction) {
      case "sumPositive":
        result = `Tổng các số dương trong mảng: ${sumPositive(numberArray)}`;
        break;

      case "countPositive":
        result = `Số lượng số dương trong mảng: ${countPositive(numberArray)}`;
        break;

      case "findSmallest":
        result = `Số nhỏ nhất trong mảng: ${findSmallest(numberArray)}`;
        break;

      case "findSmallestPositive":
        result = `Số dương nhỏ nhất trong mảng: ${findSmallestPositive(
          numberArray
        )}`;
        break;

      case "findLastEven":
        const lastEven = findLastEven(numberArray);
        result = `Số chẵn cuối cùng trong mảng: ${
          lastEven !== -1 ? lastEven : "Không tìm thấy (-1)"
        }`;
        break;

      case "swapPosition":
        const pos1 = parseInt(position1Input.value);
        const pos2 = parseInt(position2Input.value);

        if (
          isNaN(pos1) ||
          isNaN(pos2) ||
          pos1 < 0 ||
          pos2 < 0 ||
          pos1 >= numberArray.length ||
          pos2 >= numberArray.length
        ) {
          alert("Vui lòng nhập vị trí hợp lệ trong phạm vi mảng!");
          return;
        }

        const arrayBeforeSwap = [...numberArray];
        swapValues(numberArray, pos1, pos2);
        updateArrayDisplay();
        result = `Đã đổi chỗ vị trí ${pos1} và ${pos2}: [${arrayBeforeSwap.join(
          ", "
        )}] => [${numberArray.join(", ")}]`;
        break;

      case "sortArray":
        const arrayBeforeSort = [...numberArray];
        numberArray = [...numberArray].sort((a, b) => a - b);
        updateArrayDisplay();
        result = `Mảng sau khi sắp xếp tăng dần: [${arrayBeforeSort.join(
          ", "
        )}] => [${numberArray.join(", ")}]`;
        break;

      case "findFirstPrime":
        const firstPrime = findFirstPrime(numberArray);
        result = `Số nguyên tố đầu tiên trong mảng: ${
          firstPrime !== -1 ? firstPrime : "Không tìm thấy (-1)"
        }`;
        break;

      case "addRealArray":
        if (realArray.length === 0) {
          alert("Vui lòng thêm ít nhất một số vào mảng số thực!");
          return;
        }
        result = `Số lượng số nguyên trong mảng số thực: ${countIntegers(
          realArray
        )}`;
        break;

      case "comparePosiNega":
        const comparison = comparePosNeg(numberArray);
        result = comparison;
        break;
    }

    resultEl.textContent = result;
  });

  // Các hàm xử lý mảng
  function sumPositive(arr) {
    return arr.reduce((sum, num) => (num > 0 ? sum + num : sum), 0);
  }

  function countPositive(arr) {
    return arr.filter((num) => num > 0).length;
  }

  function findSmallest(arr) {
    return Math.min(...arr);
  }

  function findSmallestPositive(arr) {
    const positives = arr.filter((num) => num > 0);
    return positives.length
      ? Math.min(...positives)
      : "Không có số dương trong mảng";
  }

  function findLastEven(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] % 2 === 0) return arr[i];
    }
    return -1;
  }

  function swapValues(arr, pos1, pos2) {
    if (pos1 < arr.length && pos2 < arr.length) {
      [arr[pos1], arr[pos2]] = [arr[pos2], arr[pos1]];
    }
    return arr;
  }

  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i <= Math.sqrt(num); i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  function findFirstPrime(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (isPrime(arr[i])) return arr[i];
    }
    return -1;
  }

  function countIntegers(realArr) {
    return realArr.filter((num) => Number.isInteger(num)).length;
  }

  function comparePosNeg(arr) {
    const posCount = countPositive(arr);
    const negCount = arr.filter((num) => num < 0).length;

    if (posCount > negCount) {
      return `Số lượng số dương (${posCount}) > Số lượng số âm (${negCount})`;
    } else if (negCount > posCount) {
      return `Số lượng số âm (${negCount}) > Số lượng số dương (${posCount})`;
    } else {
      return `Số lượng số dương (${posCount}) = Số lượng số âm (${negCount})`;
    }
  }

  // Initialize
  updateArrayDisplay();
  updateRealArrayDisplay();
});
