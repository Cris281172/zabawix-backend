const checkDateValid = (endsAt) => {
	const nowDate = new Date()
	return nowDate < new Date(endsAt)
}

module.exports = checkDateValid