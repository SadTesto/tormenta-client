import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, message } from 'antd';
import axios from 'axios';

const { Text } = Typography;

const NextMatchesCard = ({ tournament }) => {
	const { pendings, teams } = tournament;

	const [matches, setMatches] = useState(null);
	const [fetching, setFetching] = useState(false);

	useEffect(() => {
		async function fetchNextMatches() {
			setFetching(true);
			try {
				const resp = await axios.get(
					'http://dev.tronweb.it/tormenta-server/get_next_matches.php'
				);
				const { data } = resp;
				if (data && data.code === 1) {
					setMatches(data.matches);
				}
				setFetching(false);
			} catch (err) {
				const { response } = err;
				if (response && response.data && response.data.message) {
					const { data } = response;
					if (data) {
						if (data.message) {
							err.message = data.message;
						}
						if (data.code === 0) {
							setMatches([]);
						}
					}
					err.message = response.data.message;
				}
				message.error(err.message);
				setFetching(false);
			}
		}
		if (
			pendings.teams === false &&
			fetching === false &&
			matches === null
		) {
			fetchNextMatches();
		}
	}, [pendings.teams, matches, fetching]);

	return (
		<Card
			bordered={true}
			title="Prossime partite"
			loading={pendings.teams === true || fetching}
		>
			{matches && matches.length === 0 ? (
				<Text
					disabled
					style={{ display: 'block', textAlign: 'center' }}
				>
					Nessuna partita in programma
				</Text>
			) : (
				<ul>
					{(matches || []).map((match, index) => (
                        match.teamA.split('_')[0] !== 'winner' ? (
                            <li key={index}>
                                {(
                                    teams.find(({ id }) => id === match.teamA) || 
                                    { name: 'Squadra non trovata' }
                                ).name} vs{' '}
                                {(
                                    teams.find(({ id }) => id === match.teamB) ||
                                    { name: 'Squadra non trovata' }
                                ).name}
                            </li>
                        ) : null
					))}
				</ul>
			)}
		</Card>
	);
};

NextMatchesCard.propTypes = {
	tournament: PropTypes.object.isRequired
};

export default NextMatchesCard;
