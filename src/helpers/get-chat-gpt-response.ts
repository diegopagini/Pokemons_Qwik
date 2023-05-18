/** @format */
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY, // To use environment variables.
});

const openai = new OpenAIApi(configuration);

export const getFunFactAboutPokemon = async (pokemonName: string): Promise<string> => {
	delete configuration.baseOptions.headers['User-Agent'];

	const response = await openai.createCompletion({
		frequency_penalty: 0,
		max_tokens: 60,
		model: 'text-davinci-003',
		presence_penalty: 0,
		prompt: `Escribe datos interesantes del pokémon ${pokemonName}`,
		temperature: 0.7,
		top_p: 1,
	});

	return response.data.choices[0].text || `No tengo nada sobre ${pokemonName}, lo siento`;
};
