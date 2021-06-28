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
