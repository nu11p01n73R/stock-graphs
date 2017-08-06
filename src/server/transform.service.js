function pe_ratio(response) {
        var labels = [],
                pe = [],
                industry_pe = []

        var body = response.data
        for (var i in body) {
                labels.push(body[i].name)
                pe.push(body[i].p_e)
                industry_pe.push(body[i].industry_p_e)
        }

        return {
                labels: labels,
                pe: pe,
                industry_pe: industry_pe
        }
}

const transform = {
        pe: pe_ratio
}

export default transform
