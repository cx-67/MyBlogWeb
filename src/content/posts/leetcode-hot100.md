---
title: "力扣 Hot 100 刷题笔记：STL、链表、回溯与动态规划"
description: "整理力扣 Hot 100 高频题的解题思路与 C++ 代码模板，覆盖哈希、链表、二叉树、回溯、动态规划、滑动窗口等核心专题。"
date: 2026-06-15
tags: ["算法", "LeetCode", "C++", "数据结构"]
---

## STL 常用库

### unordered_map —— 映射（键值对）

常见场景：计数统计（频率哈希表）、缓存 / 记忆化（DP 状态缓存）、配对 / 映射关系（两数之和记录下标）、分组聚合（字母异位词分组）。

特别注意 `operator[]`：当键不存在时，会自动插入一个值初始化的键值对（`int` 为 0，`string` 为空串）。这个特性在计数时极方便，但也可能无意中插入垃圾键。若只想判断存在性，请用 `find` 或 `contains`。

```cpp
// 统计频率
vector<int> nums = {1,2,2,3};
unordered_map<int, int> freq;
for (int x : nums) freq[x]++;   // 不存在时自动插入并初始化为0，然后++

// 两数之和（返回下标）
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;  // 值 -> 下标
    for (int i = 0; i < nums.size(); i++) {
        int left = target - nums[i];
        if (mp.contains(left)) return {mp[left], i};
        mp[nums[i]] = i;
    }
    return {};
}
```

### unordered_set —— 集合（只存键，不存值）

常见场景：去重、快速存在性判断、模拟数学集合（交并差）、判重 + 循环检测。

## 链表

### 206. 反转链表

**思路：头插法**——把遍历得到的节点插在新链表头部。

```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* pre = nullptr;  // 新链表
    ListNode* cur = head;
    while(cur) {
        ListNode* nxt = cur->next;
        cur->next = pre;  // 头插
        pre = cur;
        cur = nxt;
    }
    return pre;
}
```

### 21. 合并两个有序链表

**思路：哨兵技巧**——创建哨兵节点作为新链表头节点的前一个节点，比较 list1 和 list2 的节点值，小的接到新链表末尾。循环结束后把剩余部分接上，返回 `dummy.next`。

### 19. 删除链表的倒数第 N 个结点

**思路：双指针**——右指针先走 n 步，然后左右一起走，保持间距 n。当右指针走到末尾时，左指针正好在倒数第 n 个节点的前驱。用哨兵节点简化头节点被删除的边界情况。

### 83 / 82. 删除排序链表中的重复元素

83 题保留一个副本：若下一个节点和当前节点 val 相同则跳过。82 题删除所有重复节点（只留不同的）：用哨兵 + while 循环删除值等于 val 的全部节点。

## 二叉树

### 144 / 94 / 145. 前 / 中 / 后序遍历（递归）

递归三要素：确定参数和返回值、确定终止条件、确定单层递归逻辑。

- 前序：中左右
- 中序：左中右
- 后序：左右中

### 102. 层序遍历（BFS）

用队列实现：每次处理当前层所有节点，出队时把子节点入队。

```cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    queue<TreeNode*> q;
    vector<vector<int>> res;
    if(root) q.push(root);
    while(!q.empty()) {
        vector<int> tmp;
        for(int i = q.size(); i > 0; --i) {
            root = q.front(); q.pop();
            tmp.push_back(root->val);
            if(root->left) q.push(root->left);
            if(root->right) q.push(root->right);
        }
        res.push_back(tmp);
    }
    return res;
}
```

### 124. 二叉树的最大路径和

**关键概念：链与直径。** 链是从下面某个节点到当前节点的路径，直径是由两条（或一条）链拼成的路径。枚举每个 node 作为"拐弯点"，计算左右子链的最大和去更新答案。DFS 返回的是**链**的节点值之和，不是直径。

## 回溯

回溯与 DFS 的区别：DFS 一个劲往一个方向搜索，回溯在达到结束条件后**恢复状态，回溯上一层**。回溯与 DFS 的区别就是**有无状态重置**。

写回溯算法六步：画递归树找状态变量 → 确立结束条件 → 找选择列表 → 判断是否剪枝 → 作出选择并递归 → 撤销选择。

### 46 / 47. 全排列

47 题含重复数字，需剪枝：用 Set 排除同层重复元素。

### 78 / 90. 子集

90 题含重复元素，选或不选法：不选 `nums[i]` 时要跳过后续所有等于 `nums[i]` 的数，避免重复。递归前先排序。

### 39. 组合总和

选或不选：`dfs(i, left)` 表示枚举到 `candidates[i]`、剩余目标和 `left`。不选递归到 `dfs(i+1, left)`，选则 `dfs(i, left-candidates[i])`（i 不变，可重复选）。

## 动态规划

### 53. 最大子数组和

`dp[i]` 表示以 i 结尾的连续子数组最大和：`dp[i] = max(dp[i-1] + nums[i], nums[i])`。

也可用前缀和思路：`ans = max(ans, pre_sum - min_pre_sum)`，先算差再更新最小前缀和（相当于买卖股票，不能同一天买入卖出）。

### 300. 最长递增子序列

`dp[i]` 表示以 `nums[i]` 结尾的 LIS 长度：`dp[i] = max(dp[i], dp[j]+1)`（当 `nums[i] > nums[j]`）。

### 322. 零钱兑换

`dp[i]` 表示金额 i 所需最少硬币数：`dp[i] = min(dp[i], dp[i-coins[j]] + 1)`。

### 42. 接雨水

预处理 `leftMax[i]` 和 `rightMax[i]`，位置 i 处雨水量 = `min(leftMax[i], rightMax[i]) - height[i]`。

## 滑动窗口

### 239. 滑动窗口最大值

单调队列（双端队列）三步：右边入（维护单调递减）→ 左边出（队首离开窗口）→ 记录答案（队首即最大值）。

### 76. 最小覆盖子串

枚举右端点 right，子串涵盖 t 时不断右移左端点 left 直到不涵盖，过程中更新最短子串。字母次数统计用 `cnt[128]`（ASCll 值作下标，兼容大小写）。

## 子串

### 560. 和为 K 的子数组

前缀和 + 哈希表：`prefix[i] - prefix[j] == k` → `prefix[j] == prefix[i] - k`。遍历时用哈希表记录前缀和出现次数，每次查 `prefix[i] - k` 出现过几次。初始 `preSumCount[0] = 1`。

## 普通数组

### 56. 合并区间

按起点排序，遍历时若 `last >= start` 则合并（取 end 最大值），否则新增。

### 238. 除自身以外数组的乘积

前后缀乘积：`ans[i] = pre[i] * suf[i]`，不用除法，O(n)。

### 41. 缺失的第一个正数

"找座位"法：座位与学号匹配（学号区间 [1, n]）。`nums[nums[i]-1] != nums[i]` 时交换，直到坐对位置或学号越界。最后找第一个学号与座位编号不匹配的，全匹配则返回 n+1。

## 矩阵

### 54. 螺旋矩阵

顺时针方向数组 `{{0,1},{1,0},{0,-1},{-1,0}}`（右下左上），访问过的标记为 `INT_MAX`，下一步出界或已访问则右转 90°。

### 48. 旋转图像

两次翻转等于一次旋转：`(i,j) → (j,i) → (j, n-1-i)`。先转置（按主对角线翻转），再每行翻转。
