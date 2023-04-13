const { ParticipantRepository } = require('../repositories');

function mySlowFunction(baseNumber) {
	// console.time('mySlowFunction');
	let result = 0;	
	for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {		
		result += Math.atan(i) * Math.tan(i);
	};
	// console.timeEnd('mySlowFunction');
}

const ParticipantsUseCase = {

  create(data) {
    const { code, name } = data;
    const item = {
      code,
      name,
      votes: 0
    };

    return ParticipantRepository.create(item);
  },

  update(keys, data) {
    const { name } = data;

    const item = {
      name,
    };

    return ParticipantRepository.update(keys, item);
  },

  get(keys) {
    return ParticipantRepository.get(keys);
  },

  delete(keys) {
    return ParticipantRepository.delete(keys);
  },

  async list(filters) {
    mySlowFunction(6);
    const result = await ParticipantRepository.list(filters);
    return {
      items: result.Items,
      count: result.Count,
      ...result?.LastEvaluatedKey ? { lastKey: JSON.stringify(result.LastEvaluatedKey) } : {}
    };
  }
}

module.exports = ParticipantsUseCase;