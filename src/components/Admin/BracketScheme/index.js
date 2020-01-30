import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const BracketScheme = ({ setMatch }) => (
	<div className="tournament-container">
		<div className="tournament-headers">
			<h3>Ottavi di finale</h3>
			<h3>Quarti di finale</h3>
			<h3>Semifinali</h3>
			<h3>Finale</h3>
			<h3>Vincitore</h3>
		</div>

		<div className="tournament-brackets">
			{[
				[
					'D1 - 3BEF',
					'B1 - 3ACD',
					'F1 - E2',
					'C1 - 3ABF',
					'E1 - D2',
					'A1 - 3CDE',
					'B2 - F2'
				],
				['QF1 - QF2', 'QF3 - QF4', 'QF5 - QF6', 'QF7 - QF8'],
				['SF1 - SF2', 'SF3 - SF4'],
				['F1 - F2'],
				['Winner']
			].map((el, ind1) => (
				<ul className={`bracket bracket-${ind1 + 1}`} key={ind1}>
					{el.map((m, ind2) => (
						<li
							className={
								'team-item ' + (ind1 > 1 ? 'disabled' : '')
							}
							onClick={() =>
								ind1 > 1
									? null
									: setMatch({
											id: 0,
											teamA: 'Team A',
											teamB: 'Team B'
									  })
							}
							key={ind1 + ind2}
						>
							{m}
						</li>
					))}
				</ul>
			))}
			{/* <ul className="bracket bracket-1">
				<li className="team-item" onClick={() => setMatch({ id: 0, teamA: 'Lucid', teamB: 'Dreams'})}>12 A2 - C2 5</li>
				<li className="team-item">3 D1 - 3BEF 76</li>
				<li className="team-item">5 B1 - 3ACD 43</li>
				<li className="team-item">34F1 - E2 42</li>
				<li className="team-item">54C1 - 3ABF 2</li>
				<li className="team-item">6 E1 - D2 4</li>
				<li className="team-item">65 A1 - 3CDE 43</li>
				<li className="team-item">23 B2 - F2 23</li>
			</ul>
			<ul className="bracket bracket-2">
				<li className="team-item">QF1 - QF2</li>
				<li className="team-item">QF3 - QF4</li>
				<li className="team-item">QF5 - QF6</li>
				<li className="team-item">QF7 - QF8</li>
			</ul>
			<ul className="bracket bracket-3">
				<li className="team-item disabled">SF1 - SF2</li>
				<li className="team-item disabled">SF3 - SF4</li>
			</ul>
			<ul className="bracket bracket-4">
				<li className="team-item disabled">F1 - F2</li>
			</ul>

			<ul className="bracket bracket-5">
				<li className="team-item disabled">European Champions</li>
			</ul> */}
		</div>
	</div>
);

BracketScheme.propTypes = {
	setMatch: PropTypes.func.isRequired
};

export default BracketScheme;
