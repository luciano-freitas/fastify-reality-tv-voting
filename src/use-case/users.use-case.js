const { ViaCepIntegration } = require('../integrations');
const { UserRepository, ParticipantRepository } = require('../repositories');
const OPERATION = Object.freeze({
  SUM: "+",
  SUB: "-"
});

function mySlowFunction(baseNumber) {
	// console.time('mySlowFunction');
	let result = 0;	
	for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {		
		result += Math.atan(i) * Math.tan(i);
	};
	// console.timeEnd('mySlowFunction');
}

const UsersUseCase = {

  async create(data) {
    const { documentNumber, name, postalCode, number, complement } = data;
    const addresses = await ViaCepIntegration.getAddressByZipcodeViaCep(postalCode);

    const item = {
      documentNumber,
      name,
      addresses: {
        ...addresses,
        number,
        complement
      }
    };

    return UserRepository.create(item);
  },

  async update(keys, data) {
    const { name, postalCode, number, complement } = data;
    const addresses = await ViaCepIntegration.getAddressByZipcodeViaCep(postalCode);

    const item = {
      name,
      addresses: {
        ...addresses,
        number,
        complement
      }
    };

    return UserRepository.update(keys, item);
  },

  get(keys) {
    return UserRepository.get(keys);
  },

  delete(keys) {
    return UserRepository.delete(keys);
  },

  async list(filters) {
    const result = await UserRepository.list(filters);
    return {
      items: result.Items,
      count: result.Count,
      ...result?.LastEvaluatedKey ? { lastKey: JSON.stringify(result.LastEvaluatedKey) } : {}
    };
  },

  async votes(keys) {
    mySlowFunction(1);

    const { documentNumber, participant } = keys;
    const [userUpdated, participantUpdated] = await (() => {
      return Promise.all([
        UserRepository.create({
          documentNumber,
          participant
        }),
        ParticipantRepository.votes({ code: participant }, OPERATION.SUM),
      ]);
    })();

    return {
      ...userUpdated,
      totalVotesYouParticipant: participantUpdated.votes
    };

  }
}

module.exports = UsersUseCase;