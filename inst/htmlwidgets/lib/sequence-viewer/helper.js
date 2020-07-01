 function intersect(domains, r, mut_pos) {
	if (domains.length === 0) {
		return [r]
	}
	let i=0, merged = [], num_dom = domains.length

	if (domains[0].start > r.end || domains[num_dom-1].end < r.start) {
		if (mut_pos !== undefined) {
			return domains.concat([
				{'start': r.start, 'end':mut_pos, color: r.color, bgcolor: r.bgcolor},
				{'start': mut_pos, 'end':mut_pos+1, color: r.color, bgcolor: "red"},
				{'start': mut_pos+1, 'end':r.end, color: r.color, bgcolor: r.bgcolor},
			])
		} else {
			return domains.concat(r)
		}
	}
	let is_overlap = false
	for (dom of domains) {
		if (r.end < dom.start || r.start > dom.end) {
						merged = merged.concat(dom)
		} else if (dom.end > r.end && dom.start < r.start) {
						is_overlap = true
			if (mut_pos !== undefined) {
				merged = merged.concat([
					{'start': dom.start, 'end': r.start, color: dom.color, underscore: dom.underscore},
					{'start': r.start, 'end':mut_pos, color: r.color,  underscore: dom.underscore, bgcolor: r.bgcolor},
					{'start': mut_pos, 'end':mut_pos+1, color: r.color, underscore: dom.underscore, bgcolor: "red"},
					{'start': mut_pos+1, 'end':r.end, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
					{'start': r.end, 'end': dom.end, color: dom.color, underscore: dom.underscore}
				])
			} else {
				merged = merged.concat([
					{'start': dom.start, 'end': r.start, color: dom.color, underscore: dom.underscore},
					{'start': r.start, 'end': r.end, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
					{'start': r.end, 'end': dom.end, color: dom.color, underscore: dom.underscore}
				])
			}
		} else if (dom.end < r.end) {
						is_overlap = true
			if (mut_pos !== undefined) {
				if (mut_pos >= dom.end) {
					merged = merged.concat([
						{'start': dom.start, 'end': r.start, color: dom.color, underscore: dom.underscore},
						{'start': r.start, 'end': dom.end, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
						{'start': dom.end, 'end': mut_pos, color: r.color, underscore: r.underscore, bgcolor: r.bgcolor},
						{'start': mut_pos, 'end':mut_pos+1, color: r.color, underscore: r.underscore, bgcolor: "red"},
						{'start': mut_pos+1, 'end':r.end, color: r.color, underscore: r.underscore, bgcolor: r.bgcolor}
					])
				} else {
					merged = merged.concat([
						{'start': dom.start, 'end': r.start, color: dom.color, underscore: dom.underscore},
						{'start': r.start, 'end':mut_pos, color: r.color,  underscore: dom.underscore, bgcolor: r.bgcolor},
						{'start': mut_pos, 'end':mut_pos+1, color: r.color, underscore: dom.underscore, bgcolor: "red"},
						{'start': mut_pos+1, 'end':dom.end, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
						{'start': dom.end, 'end': r.end, color: r.color, underscore: r.underscore, bgcolor: r.bgcolor}
					])
				}
			} else {
				merged = merged.concat([
					{'start': dom.start, 'end': r.start, color: dom.color, underscore: dom.underscore},
					{'start': r.start, 'end': dom.end, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
					{'start': dom.end, 'end': r.end, color: r.color, underscore: r.underscore, bgcolor: r.bgcolor}
				])
			}
		} else if (dom.start > r.start) {
						is_overlap = true
			if (mut_pos !== undefined) {
				if (mut_pos >= dom.start) {
					merged = merged.concat([
						{'start': r.start, 'end': dom.start, color: r.color, underscore: r.underscore, bgcolor: r.bgcolor},
						{'start': dom.start, 'end': mut_pos, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
						{'start': mut_pos, 'end':mut_pos+1, color: r.color, underscore: dom.underscore, bgcolor: "red"},
						{'start': mut_pos+1, 'end':r.end, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
						{'start': r.end, 'end': dom.end, color: dom.color, underscore: dom.underscore}
					])
				} else {
					merged = merged.concat([
						{'start': r.start, 'end': mut_pos, color: r.color, underscore: r.underscore, bgcolor: r.bgcolor},
						{'start': mut_pos, 'end':mut_pos+1, color: r.color, underscore: r.underscore, bgcolor: "red"},
						{'start': mut_pos+1, 'end': dom.start, color: r.color, underscore: r.underscore, bgcolor: r.bgcolor},
						{'start': dom.start, 'end':r.end, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
						{'start': r.end, 'end': dom.end, color: dom.color, underscore: dom.underscore}
					])
				}
			} else {
				merged = merged.concat([
					{'start': r.start, 'end': dom.start, color: r.color, underscore: r.underscore, bgcolor: r.bgcolor},
					{'start': dom.start, 'end': r.end, color: r.color, underscore: dom.underscore, bgcolor: r.bgcolor},
					{'start': r.end, 'end': dom.end, color: dom.color, underscore: dom.underscore}
				])
			}
		}
	}
	if (!is_overlap) {
		//non-overlapping and in segments between domains
		if (mut_pos === undefined) {
			return domains.concat(r)
		} else {
			return domains.concat([
				{'start': r.start, 'end':mut_pos, color: r.color, bgcolor: r.bgcolor},
				{'start': mut_pos, 'end':mut_pos+1, color: r.color, bgcolor: "red"},
				{'start': mut_pos+1, 'end':r.end, color: r.color, bgcolor: r.bgcolor},
			])
		}
	}
	return merged
}