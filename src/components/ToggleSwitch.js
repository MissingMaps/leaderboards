import React from 'react';

export default function () {
	return (
		<div>
			<div className="onoffswitch">
				<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" ></input>
					<label className="onoffswitch-label" htmlFor="myonoffswitch">
					<span className="onoffswitch-inner"></span>
					<span className="onoffswitch-switch"></span>
				</label>
			</div>
			<div className="onoffswitch">
				<input type="checkbox" name="onoffswitch2" className="onoffswitch-checkbox" id="myonoffswitch2" ></input>
					<label className="onoffswitch-label" htmlFor="myonoffswitch2">
					<span className="onoffswitch-inner"></span>
					<span className="onoffswitch-switch"></span>
				</label>
			</div>
			<div className="onoffswitch">
				<input type="checkbox" name="onoffswitch3" className="onoffswitch-checkbox" id="myonoffswitch3" ></input>
					<label className="onoffswitch-label" htmlFor="myonoffswitch3">
					<span className="onoffswitch-inner"></span>
					<span className="onoffswitch-switch"></span>
				</label>
			</div>
		</div>
	);
}