const randomizeChestContent = (chest) => {
    let totalChances = 0;
    chest.content.forEach(item => {
        totalChances += item.hittingChances;
    });

    const randomNumber = Math.random() * totalChances;
    let currentSum = 0;

    for (const item of chest.content) {
        currentSum += item.hittingChances;
        if (randomNumber <= currentSum) {
            return item;
        }
    }
};

module.exports = randomizeChestContent