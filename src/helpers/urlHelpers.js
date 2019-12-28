export function getUrlParameters(search) {
	const query = search || location.search.substr(1)
	const result = {}
	if (!query) return result
	const preQuery = query.replace('?', '&')
	preQuery.split('&')
		.forEach((part) => {
			const item = part.split('=')
			result[item[0]] = decodeURIComponent(item[1])
		})
	return result
}

export function buildUrlSearch(params, start = true) {
	if (!params) return ''
	const res = Object
		.keys(params)
		.reduce((acc, key) => {
			if (params[key] || params[key] === 0) {
				if (Array.isArray(params[key])) {
					const arr = params[key].reduce((sum, elem) => sum + `&${key}[]=${elem}`, '')
					return acc + arr
				}
				return acc + (!acc ? '' : '&') + `${key}=${params[key]}`
			}
			return acc
		}, '')
	return res && start
		? `?${res}`
		: res
			? `&${res}`
			: ''
}
