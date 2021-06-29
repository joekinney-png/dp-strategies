const can_partition = function (num) {
  // calculate the total sum of all elements in the input array
  const totalSum = num.reduce((a, b) => a + b);
  // if its the case that the total sum is not divisible by two then we cannot find a partition
  if (totalSum % 2 !== 0) return false;
  // else, initialize storage for past subproblems in the closure
  return find_partition(num, totalSum / 2, 0) || false;
};

const find_partition = function (num, target, i) {
  // return if we exceeded the target or if we made it through the num array
  if (target < 0 || i >= num.length) return false;
  // base case, which means that we have found a partition
  if (target === 0) return true;

  // take it
  let result1;
  if (target - num[i] >= 0) {
    result1 = find_partition(num, target - num[i], i + 1);
  }

  // leave it
  let result2 = find_partition(num, target, i + 1);

  // if we haven't found a partition, we will both take and leave it
  return result1 || result2;
};

console.log(`Can partition: ${can_partition([1, 2, 3, 4])}`);
console.log(`Can partition: ${can_partition([1, 1, 3, 4, 7])}`);
console.log(`Can partition: ${can_partition([2, 3, 4, 6])}`);

const can_partition_memo = function (num) {
  // calculate the total sum of all elements in the input array
  const totalSum = num.reduce((a, b) => a + b);
  // if its the case that the total sum is not divisible by two then we cannot find a partition
  if (totalSum % 2 !== 0) return false;
  // else, initialize storage for past subproblems in the closure
  const dp = [];
  // and recursively (top-down) check for valid partitions, one subproblem at a time
  return find_partition_memo(num, totalSum / 2, 0, dp) || false;
};

const find_partition_memo = function (num, target, i, dp) {
  // return if we exceeded the target or if we made it through the num array
  if (target < 0 || i >= num.length) return false;
  // base case, which means that we have found a partition
  if (target === 0) return true;

  // if we didn't hit a base case then make sure we have this index in the dp array
  dp[i] = dp[i] || [];

  // populate dp if we don't already have an answer
  if (dp[i][target] === undefined) {
    // take it if we don't exceed the target when taking it
    let result1;
    if (target - num[i] >= 0) {
      result1 = find_partition_memo(num, target - num[i], i + 1, dp);
    }

    // leave it
    let result2 = find_partition_memo(num, target, i + 1, dp);

    // set our storage equal to the returned result of the cumulative result of subproblems
    dp[i][target] = result1 || result2;
  }

  // if we haven't found a partition, we will both take and leave it
  return dp[i][target];
};

console.log(`Can partition: ${can_partition_memo([1, 2, 3, 4])}`);
console.log(`Can partition: ${can_partition_memo([1, 1, 3, 4, 7])}`);
console.log(`Can partition: ${can_partition_memo([2, 3, 4, 6])}`);

const can_partition_bu = function (num) {
  // calculate the total sum
  const totalSum = num.reduce((a, b) => a + b);
  // make sure its possible to find a partition satisfying the condition
  if (totalSum % 2 !== 0) return false;
  // if we can find a partition, intialize a target
  const target = totalSum / 2;

  // initialize a dp matrix to store results of subproblems
  // (cols are indexes and rows are sums to target)
  const dp = new Array(num.length)
    .fill(false)
    .map(() => new Array(target + 1).fill(false));

  // we can always generate a subset that adds to 0 from the first i numbers by not taking any
  dp.forEach((row) => (row[0] = true));

  // we can generate a subset that adds to the first element in sum that adds to that amount
  for (let s = 0; s < dp[0].length; s++) {
    if (num[0] === s) dp[0][s] = true;
  }

  // process all the other subproblems
  for (let i = 1; i < dp.length; i++) {
    for (let s = 1; s < dp[0].length; s++) {
      // if we can get the sum without the number at index i, leave it
      if (dp[i - 1][s]) {
        dp[i][s] = dp[i - 1][s];
      } else {
        dp[i][s] = dp[i][s - num[i]];
      }
    }
  }

  return dp[num.length - 1][target];
};

console.log(`Can partition: ${can_partition_bu([1, 2, 3, 4])}`);
console.log(`Can partition: ${can_partition_bu([1, 1, 3, 4, 7, 3])}`);
console.log(`Can partition: ${can_partition_bu([2, 3, 4, 6])}`);

const can_partition_bu_op = function (num) {
  // calculate the total sum
  const totalSum = num.reduce((a, b) => a + b);
  // make sure its possible to find a partition satisfying the condition
  if (totalSum % 2 !== 0) return false;
  // if we can find a partition, intialize a target
  const target = totalSum / 2;

  // simply the matrix to a single array that we will repeatedly traverse
  const dp = new Array(num.length).fill(false);

  // we can always generate a set that sums to zero by not taking any elements
  dp[0] = true;

  // if we take a single element, then we can generate the sum that corresponds to that number
  for (let s = 1; s <= target; s++) {
    if (num[0] === s) dp[s] = true;
  }

  // process all the other subproblems
  for (let i = 1; i < dp.length; i++) {
    for (let s = 1; s <= target; s++) {
      // if we can get the sum without the number at index i, leave it
      if (!dp[s]) {
        dp[s] = dp[s - num[i]];
      }
    }
  }

  return dp[target];
};

console.log(`Can partition: ${can_partition_bu_op([1, 2, 3, 4])}`);
console.log(`Can partition: ${can_partition_bu_op([1, 1, 3, 4, 7, 3])}`);
console.log(`Can partition: ${can_partition_bu_op([2, 3, 4, 6])}`);
