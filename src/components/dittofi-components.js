import React, { Children, cloneElement, Fragment, isValidElement, PureComponent, useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from 'react-dom';

import { Link as ReactRouterLink } from "react-router-dom";
import NextLink from "next/link";
import _ from 'lodash';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart as RechartsPieChart } from 'recharts';

function expandFragment(children) {
  // Convert children to an array
  let childrenArray = Children.toArray(children);

  // Flatten any fragments by extracting their children
  childrenArray = childrenArray.flatMap((child) => {
    if (child.type === Fragment) {
      // If the child is a Fragment, return its children as an array
      return Children.toArray(child.props.children);
    }
    // Otherwise, return the child itself
    return child;
  });

  return childrenArray;
}

function deepMap(children, deepMapFn) {
	return Children.toArray(children).map((child, index, mapChildren) => {
		if (isValidElement(child) && hasComplexChildren(child)) {
			return deepMapFn(
				cloneElement(child, {
					...child.props,
					children: deepMap(child.props.children, deepMapFn),
				})
			);
		}
		return deepMapFn(child, index, mapChildren);
	});
}

function hasChildren(element) {
		return isValidElement(element) && element.props.children;
}

function hasComplexChildren(element) {
	return isValidElement(element) && hasChildren(element)
		&& Children.toArray(element.props.children).reduce((res, child) => res || isValidElement(child), false);
}


// export const Link = ({ children, ...props }) => {
// 	return (
// 		<ReactRouterLink {...props}>
// 			{children}
// 		</ReactRouterLink>
// 	);
// };

export const Link = ({ to = "#", children, ...props }) => {
	return (
		<NextLink href={to} {...props}>
			{children}
		</NextLink>
	);
};




export const Chart = (props) => {
		const { children, className, data, minHeight } = props;
		return (
				<div className={className}>
						<ResponsiveContainer minHeight={minHeight} width="100%" height="100%">
								<ComposedChart data={data}>
										{children}
								</ComposedChart>
						</ResponsiveContainer>
				</div>
		);
}

export const PieChart = ({
  data = [],
  width,
  height,
  innerRadius,
  outerRadius,
  showName = true,  // Default to true
  showValue = true, // Default to true
  xKey,
  yKey,
  onChange,
  name,
  fill
}) => {
  const processedData = Array.isArray(data) ? data.map((t) => ({
    ...t,
    [yKey]: Number(t[yKey]),
    fill: t[fill] || fill
  })) : [];

  const handleOnClick = (data) => {
    onChange && onChange({target: { value: data[xKey], name } })
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          onClick={handleOnClick}
          data={processedData}
          cx={width / 2}
          cy={height / 2}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={0}
          dataKey={yKey} // Use the provided yKey
          nameKey={xKey} // Use the provided xKey
          label={(showName || showValue) ? (entry) => {
            let label = showName ? entry[xKey] : ""; // Use xKey for name
            if (showValue) {
              label += showName ? ` (${entry[yKey]})` : `${entry[yKey]}`; // Use yKey for value
            }
            return label;
          } : null}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

const EditorJSCore = "https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest";

const EditorJSTools = {
	"Header": "https://cdn.jsdelivr.net/npm/@editorjs/header@latest",
	"SimpleImage": "https://cdn.jsdelivr.net/npm/@editorjs/simple-image@latest",
	"List": "https://cdn.jsdelivr.net/npm/@editorjs/list@latest/dist/list.umd.js",
	"RawTool": "https://cdn.jsdelivr.net/npm/@editorjs/raw",
	"Underline": "https://cdn.jsdelivr.net/npm/@editorjs/underline@latest"
}

export const RichTextEditor = (props) => {
	const { className, data, name, onChange, readOnly, value } = props;
	
	const elementRef = useRef();
	const editorRef = useRef();
	const prevTimeRef = useRef();
	
	useEffect(() => {
		var initEditor = function () {
			var EditorJS = window.EditorJS;
			console.log(EditorJS)
			if(EditorJS) {
				// Build list of tools.
				const tools = {};
				Object.keys(EditorJSTools).forEach((tool) => {
					if (!window[tool]) {
					console.warn(`${tool} is not loaded`);
					} else {
					tools[tool] = window[tool];
					}
				});

				// Init editor.
				editorRef.current = new EditorJS({
					holder: elementRef.current,
					data: value,
					onChange: async (api, event) => {
						const savedData = await editorRef.current.save();
						prevTimeRef.current = savedData.time;
						onChange && onChange({target: { value: savedData, name } })
						},
						tools
				});
			}
		};

		window.loadSources([EditorJSCore, ...Object.keys(EditorJSTools).map((k) => EditorJSTools[k])], initEditor, "text/javascript");
	}, []);

	useEffect(() => {
		if(editorRef && editorRef.current && editorRef.current.render && value) {
			if(prevTimeRef.current !== value.time) {
				prevTimeRef.current = value.time;
				editorRef.current.render(value);
			}
		}
	}, [value]);

	
	return (
		<div
			className={className}
			ref={elementRef}
		/>
	);
}

export const RichText = (props) => {
	const { className, data, onChange, readOnly } = props;
	if(readOnly !== "true") {
		return (
			<RichTextEditor {...props} />
		);
	}

	return (
		<div>
			{(data && Array.isArray(data.blocks)) && data.blocks.map((b, i) => {
				if(b.type) {
					switch(b.type.toLowerCase()) {
						case "header": {
							let content;
							switch(b?.data?.level) {
								case 1: 
									content = ( <h1 key={i} dangerouslySetInnerHTML={{ __html: b?.data?.text }} /> );
									break;
								case 2: 
									content = ( <h2 key={i} dangerouslySetInnerHTML={{ __html: b?.data?.text }} /> );
									break;
								case 3: 
									content = ( <h3 key={i} dangerouslySetInnerHTML={{ __html: b?.data?.text }} /> );
									break;
								case 4: 
									content = ( <h4 key={i} dangerouslySetInnerHTML={{ __html: b?.data?.text }} /> );
									break;
								case 5: 
									content = ( <h5 key={i} dangerouslySetInnerHTML={{ __html: b?.data?.text }} /> );
									break;
								case 6: 
									content = ( <h5 key={i} dangerouslySetInnerHTML={{ __html: b?.data?.text }} /> );
									break;
								default: 
									content = ( <p key={i} dangerouslySetInnerHTML={{ __html: b?.data?.text }} /> );
							}

							return content;
						}
						case "list": {
							let content;
							if(!Array.isArray(b?.data?.items)) {
								content = ( <p>Failed to parse list without items</p> );
							} else {
								switch (b?.data?.style) {
									case 'ordered': {
										content = (
											<ol key={i}>
												{b?.data?.items.map((li, idx) => {
													return (
														<li key={idx} dangerouslySetInnerHTML={{ __html: li }} />
													);
												})}
											</ol>
										);
										break;
									}
									default: {
										content = (
											<li key={i}>
												{b?.data?.items.map((li, idx) => {
													return (
														<li key={idx} dangerouslySetInnerHTML={{ __html: li }} />
													);
												})}
											</li>
										);
									}
								}
							}

							return content;
						}
						case "paragraph": {
							return ( <p key={i} dangerouslySetInnerHTML={{ __html: b?.data?.text }} /> );
						}
						case "rawtool": {
							return (<div key={i} dangerouslySetInnerHTML={{ __html: b?.data?.html }} />)
						}
						case "simpleimage": {
							return ( <img style={{ maxWidth:"100%", height:"auto" }} key={i} alt={b?.data?.caption} src={b?.data?.url} title={b?.data?.caption} /> );
						}
										default: {
											return ( <p>Unsupported block type {b.type}</p> );
										}
					}
				} else {
					console.warn(`Block missing type: ${b}`, b)
				}
			})}
		</div>
	);
}

export const ToggleWrapper = ({ autoClose, children, className, keyboard, name, onChange, value, ...rest }) => {
	// Track open state internally or from props
	const [open, setOpen] = useState(false);
	const isOpen = (open && value !== false) || (value === true);

	const wrapperRef = useRef(null);

	const onToggle = () => onChange 
		? onChange({ target: { value: !value, name } })
		: setOpen(!open);

	// Close modal when escape key pressed 
	const escFunction = useCallback((event) => {
		if (event.key === "Escape" && keyboard) {
			setOpen(false);
		}
	}, []);

	// Close modal when click outside dropdown
	const clickOutsideFunction = useCallback(
		(event) => {
			if(isOpen) {
				// Check if the click occurred inside the ToggleWrapper
						const isClickInsideComponent = wrapperRef.current && wrapperRef.current.contains(event.target);

						if((autoClose === 'both') || (autoClose === 'inside' && isClickInsideComponent) ||
							(autoClose === 'outside' && !isClickInsideComponent)) {
							onToggle();
						}
			}
		},
		[isOpen]
	);

	useEffect(() => {
		document.addEventListener("keydown", escFunction, false);

		// Close on outside click
		document.addEventListener("click", clickOutsideFunction, false);
		
		return () => {
			document.removeEventListener("keydown", escFunction, false);
			document.removeEventListener("click", clickOutsideFunction, false);
		};
	}, [escFunction, clickOutsideFunction, autoClose]);

	// Add open/close class
	let classes = className ? 
		className.split(" ").filter((c) => c !== "d--open" && c !== "d--closed") 
		: [];
	isOpen ? classes.push("d--open") : classes.push("d--closed");

	// Append onClick to child toggle component
	const getChildren = () => {
		return deepMap(children, (child) => {
			let result = child;
			if(child?.props?.role === "d-toggle-button") {
				result = cloneElement(child, {
					...child.props,
					onClick: (e) => onToggle()
				});
			} else if(child?.props?.role === "form" && child?.props?.closeOnSubmit && child?.props?.onSubmit) {
				result = cloneElement(child, {
					...child.props,
					onSubmit: (e) => {
						onToggle();
						child.props.onSubmit(e);
					}
				});
			}

			return result;
		});
	}

	return (
		<div ref={wrapperRef} {...rest} onChange={undefined} className={classes.join(" ")}>
			{getChildren()}
		</div>
	);
}

export class Tabs extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0,
		}
	}

	onSelectTab = (index) => {
		const { name, onChange } = this.props;
		onChange ? onChange({target: { value: index, name } }) : this.setState({ selectedIndex: index })
	}

	getChildren = () => {
		let { selectedIndex } = this.state;
		const { value } = this.props;
		if(value || value === 0) {
			selectedIndex = value;
		}

		return deepMap(this.props.children, (child) => {
			let result = child;
			if(child?.props?.role === "d-tabsmenu") {
				let index = -1;
				result = cloneElement(child, {
					children: deepMap(child.props.children, (c) => {
						if(c.props.role === "d-tablink") {
							++index;
							
							let classes = c.props.className ? 
								c.props.className.split(" ").filter((c) => c !== "d--tab-link-active") 
								: [];
							if(selectedIndex === index) {
								classes.push("d--tab-link-active");
							}

							let clickIndex = index;
							return cloneElement(c, {
								...c.props,
								className: classes.join(" "),
								onClick: () => this.onSelectTab(clickIndex)
							});
						}
						
						return c;
					}),
				});
			} else if(child?.props?.role === "d-tabcontent") {
				result = cloneElement(child, {
					children: Children.toArray(child.props.children).map((tabpane, i) => {
						let classes = tabpane.props.className ? 
							tabpane.props.className.split(" ").filter((c) => c !== "d--tab-active") 
							: [];
						if(selectedIndex === i) {
							classes.push("d--tab-active");
							return cloneElement(tabpane, {
								...tabpane.props,
								className: classes.join(" ")
							});
						}

						return null;
					}),
				});
			}
			return result;
		});
	}

	render() {
		return (
			<div {...this.props} onChange={undefined}>
				{this.getChildren()}
			</div>
		);
	}
}

export const Slider = ({ children, numSlides, period, ...rest }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	// Ensure numSlides is a number
	const numSlidesNumber = Number(numSlides);

	// Automatic sliding
	useEffect(() => {
		let interval;
		if (period) {
			interval = setInterval(() => {
				next();
			}, period);
		}

		return () => interval && clearInterval(interval);
	}, [period, selectedIndex]);

	// Go to next slide
	const next = () => {
		if (!isNaN(numSlidesNumber) && numSlidesNumber > 0) {
			(selectedIndex + 1) >= numSlidesNumber
				? setSelectedIndex(0)
				: setSelectedIndex(selectedIndex + 1);
		} else {
			setSelectedIndex(selectedIndex + 1);
		}
	};

	// Add on click events to children
	const getChildren = () => {
		return deepMap(children, (child) => {
			let result = child;
			if (child?.props?.role === 'd-mask') {
				result = cloneElement(child, {
					children: deepMap(child.props.children, (c, i) => {
						if (c?.props?.role === 'd-slide') {
							return cloneElement(c, {
								...c.props,
								style: {
									...c.props.style,
									transform: `translateX(${-100 * selectedIndex}%)`,
									transition: 'transform 500ms ease 0s',
									width: '100%',
								},
							});
						}

						return c;
					}),
				});
			} else if (child?.props?.role === 'd-slide-left') {
				result = cloneElement(child, {
					...child.props,
					onClick: (e) => {
						e.stopPropagation();
						setSelectedIndex(Math.max(selectedIndex - 1, 0));
					},
				});
			} else if (child?.props?.role === 'd-slide-right') {
				result = cloneElement(child, {
					...child.props,
					onClick: (e) => {
						e.stopPropagation();
						next();
					},
				});
			}
			return result;
		});
	};

	return (
		<div {...rest}>
			{getChildren()}
		</div>
	);
}

export const Draggable = ({ children, initialX = 0, initialY = 0, name, onChange }) => {
	const [position, setPosition] = useState({ x: initialX, y: initialY });
	const startPositionRef = useRef({ x: initialX, y: initialY });
	const isDraggingRef = useRef(false);

	const handleMouseDown = (e) => {
		e.preventDefault();
		e.stopPropagation();

		isDraggingRef.current = true;

		const startX = e.clientX;
		const startY = e.clientY;

		startPositionRef.current = { x: position.x, y: position.y };

		const handleMouseMove = (e) => {
			if (isDraggingRef.current) {
				const deltaX = e.clientX - startX;
				const deltaY = e.clientY - startY;

				const newPosition = {
					x: startPositionRef.current.x + deltaX,
					y: startPositionRef.current.y + deltaY,
				}

				setPosition(newPosition);

				if(onChange) {
					onChange({ target: { value: newPosition, name } })
				}
			}
		};

		const handleMouseUp = () => {
			isDraggingRef.current = false;

			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	return (
		<div
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`, 
				cursor: 'move', 
				transition: 'transform 0.2s ease-out'
			}}
			onMouseDown={handleMouseDown}
		>
			{children}
		</div>
	);
};

export const ZoomablePannable = ({ children, scale: externalScale }) => {
	const [scale, setScale] = useState(1);
	const [pan, setPan] = useState({ x: 0, y: 0 });

	useEffect(() => {
			if (!isNaN(externalScale)) {
			// Update the internal scale when the external scale changes
				setScale(externalScale);
		}
		}, [externalScale]);

	const handleWheel = (e) => {
		e.preventDefault();

		// Adjust the scale based on the wheel delta
		const newScale = Math.min(3, Math.max(0.5, scale - e.deltaY * 0.01));
		setScale(newScale);
	};

	const handleMouseDown = (e) => {
		e.preventDefault();

		// Store the initial position of the mouse on pan start
		const startX = e.clientX;
		const startY = e.clientY;

		const handleMouseMove = (e) => {
			// Calculate the change in position and update the pan state
			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;

			setPan({
				x: pan.x + deltaX,
				y: pan.y + deltaY,
			});
		};

		const handleMouseUp = () => {
			// Remove the event listeners on mouse up
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		// Add event listeners for panning
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				position: "relative",
				overflow: "hidden",
			}}
			onWheel={handleWheel}
			onMouseDown={handleMouseDown}
		>
			<div
				className="inner-content"
				style={{
					width: "100%",
					height: "100%",
					transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
					transformOrigin: '0 0',
					overflow: 'auto',
				}}
			>
				{children}
			</div>
		</div>
	);
};

export const Form = (props) => {
		// Class to track form submission
		const wasValidatedClassName = "d--was-validated";
	 
		// State to track whether the form was submitted
		const [wasValidated, setWasValidated] = useState(false);

		// Destructuring props
		const { className, children, onSubmit } = props;

		// Function to handle form submission
		const handleSubmit = (e) => {
				// Mark the form as submitted
				setWasValidated(true);

				// Prevent the default form submission behavior
				e.preventDefault();

				// Prevent submit proogation to other forms
				e.stopPropagation();

				// Get the form element
				const form = e.target;

				// Check form validity and call onSubmit if provided
				if (form.checkValidity() && onSubmit) {
						onSubmit(e);
				}
		};

		// Function to check file size
	    const checkFileSize = (e) => {
	        const input = e.target;
	        if (input.type === "file") {
	            const maxSize = input.getAttribute("max");
	            const files = input.files;
	            if (maxSize && files.length > 0 && files[0].size > maxSize) {
	                input.setCustomValidity("File size exceeds maximum allowed size.");
	            } else {
	                input.setCustomValidity("");
	            }
	        }
	    };

	    // Function to get children and attach file size checker
		const getChildren = () => {
			return deepMap(children, (child) => {
				let result = child;
				if (child?.props?.type === 'file') {
					result = cloneElement(child, {
						onChange: checkFileSize,
						...child.props
					});
				}

				return result;
			});
		};

		// Add was-validated class to the form's class
		let classes = className ? className.split(" ").filter((c) => c !== wasValidatedClassName) : [];

		if (wasValidated) {
				classes.push(wasValidatedClassName);
		}

		// Render the form with conditional class and onSubmit handler
		return (
			<form className={classes.join(" ")} noValidate {...props} onSubmit={handleSubmit}>
				{getChildren()}
			</form>
		);
};

export const Progress = ({ className, max, min, value, children }) => {
	// Calculate the percentage of completion
	const percentage = ((value - min) / (max - min)) * 100;

	const getChildren = () => {
		return deepMap(children, (child) => {
			let result = child;
			if (child?.props?.role === 'd-progress-bar') {
				result = cloneElement(child, {
					...child.props,
					style: {
						...child.props.style,
						width: `${percentage}%`,
					}
				});
			}

			return result;
		});
	};

	return <div className={className}>{getChildren()}</div>;
};

export const RangeSlider = ({ className, onChange, name, min, max, step, children, value }) => {
	// Ensure step, min, and max are treated as numbers
	const numericStep = Number(step) || 1;
	const numericMin = Number(min) || 0;
	const numericMax = Number(max) || 100;

	// Ensure value is treated as a number
	const numericValue = Number(value) || 0;

	const handleIncrement = () => {
		if (numericValue + numericStep <= numericMax) {
			onChange && onChange({ target: { value: numericValue + numericStep, name } });
		}
	};

	const handleDecrement = () => {
		if (numericValue - numericStep >= numericMin) {
			onChange && onChange({ target: { value: numericValue - numericStep, name } });
		}
	};

	const handleChange = (e) => {
		onChange && onChange({ target: { value: parseInt(e.target.value, 10), name } });
	};

	const getChildren = () => {
		return deepMap(children, (child) => {
			let result = child;

			if (child?.props?.role === 'd-increment-button') {
				result = cloneElement(child, {
					...child.props,
					onClick: (e) => {
						handleIncrement();
						if (child.props.onClick) {
							child.props.onClick(e);
						}
					},
				});
			} else if (child?.props?.role === 'd-decrement-button') {
				result = cloneElement(child, {
					...child.props,
					onClick: (e) => {
						handleDecrement();
						if (child.props.onClick) {
							child.props.onClick(e);
						}
					},
				});
			} else if (child?.props?.role === 'd-range-slider') {
				result = cloneElement(child, {
					...child.props,
					name,
					min: numericMin,
					max: numericMax,
					step: numericStep,
					onChange: handleChange,
					value: numericValue,
				});
			}

			return result;
		});
	};

	return <div className={className}>{getChildren()}</div>;
};

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {error: ""};
	}

	componentDidCatch(error) {
		this.setState({error: `${error.name}: ${error.message}`});
	}

	render() {
		const {error} = this.state;
		if (error) {
			return (
				<div>{error}</div>
			);
		} else {
			return <>{this.props.children}</>;
		}
	}
}

export const Select = ({ children, multi, name, onChange, options, value, ...rest }) => {
	const [selectedOptions, setSelectedOptions] = useState(
		multi ? (value || []) : value
	);

	 useEffect(() => {
		// Update selectedOptions when value prop changes
		setSelectedOptions(multi ? (value || []) : value);
	}, [value, multi]);

	const handleSelectChange = (event) => {
		const selectedValues = Array.from(event.target.selectedOptions).map(
			(option) => option.value
		);

		setSelectedOptions(multi ? selectedValues : selectedValues[0]);

		if (onChange) {
			onChange({target: { value: multi ? selectedValues : selectedValues[0], name } })
		}
	};

	return (
		<select
			multiple={multi}
			value={selectedOptions}
			onChange={handleSelectChange}
			{...rest}
		>
			{Array.isArray(options) &&
				options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))
			}
			{children}
			
		</select>
	);
};

const MountHandler = ({ componentDidMount, children }) => {
	useEffect(() => {
		if (componentDidMount && typeof componentDidMount === 'function') {
			componentDidMount();
		}

		// The cleanup function (componentWillUnmount)
		return () => {
			// TODO - use if we ever need cleaup logic
		};
	}, [onMount]);

	return children;
};

export function toLocalString(date, withTime) {
	let localString;
	try {
		const timeZoneOffset = withTime ? new Date(date).getTimezoneOffset() * 60000 : 0;
		localString = (new Date(new Date(date) - timeZoneOffset)).toISOString().slice(0, -1);
	} catch(e) { 
		const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
		localString = new Date(new Date() - timeZoneOffset).toISOString().slice(0, -1);
	}
	
	return withTime ? localString : localString.slice(0, 10);
}

export function toISOString(date) {
	let isoString;
	try {
		isoString = new Date(date).toISOString();
	} catch(e) { 
		isoString = new Date().toISOString();
	}

	return isoString;
}

const INDEXED_DB_DATABASE_NAME = "AppDatabase"

export function toCache(key, data) {
	try {
		if ('indexedDB' in window) {
			// If IndexedDB is supported, use it
			writeToIndexedDB(INDEXED_DB_DATABASE_NAME, key, data)
				.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.error(error);
				// If writing to IndexedDB fails, fall back to localStorage
				toLocalStorage(key, data);
			});
		} else {
			// If IndexedDB is not supported, fall back to localStorage
			toLocalStorage(key, data);
		}
	} catch (error) {
		console.error('Error writing to localStorage:', error);
	}
}

export function toLocalStorage(key, data) {
	try {
		// Use JSON.stringify for objects and arrays, otherwise store directly
		const serializedData = typeof data === 'object' ? JSON.stringify(data) : data;
		localStorage.setItem(key, serializedData);
	} catch (error) {
		console.error('Error writing to localStorage:', error);
	}
}

export function writeToIndexedDB(databaseName, storeName, data) {
	return new Promise((resolve, reject) => {
		// Open (or create) the database
		const request = indexedDB.open(databaseName, 1);

		// Handle database upgrades or creation
		request.onupgradeneeded = (event) => {
			const db = event.target.result;

			// Create an object store if it doesn't exist
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
			}
		};

		// Handle successful database opening
		request.onsuccess = (event) => {
			const db = event.target.result;

			// Open a transaction and get the object store
			const transaction = db.transaction(storeName, 'readwrite');
			const objectStore = transaction.objectStore(storeName);

			// Add data to the object store
			const addRequest = objectStore.add(data);

			// Handle the success of the add operation
			addRequest.onsuccess = () => {
				resolve('Data added to IndexedDB');
			};

			// Handle errors during the add operation
			addRequest.onerror = () => {
				reject('Error adding data to IndexedDB');
			};

			// Close the transaction and the database
			transaction.oncomplete = () => {
				db.close();
			};
		};

		// Handle errors opening the database
		request.onerror = (event) => {
			reject(`Error opening IndexedDB: ${event.target.error}`);
		};
	});
}

export function fromLocalStorage(key) {
	try {
		const storedData = localStorage.getItem(key);

		if (storedData === null) {
			// Key doesn't exist in localStorage
			console.error(`Key '${key}' not found in localStorage`);
			return null;
		}

		// Try to parse the stored data as JSON, or use it as is
		try {
			return JSON.parse(storedData);
		} catch (error) {
			// If parsing fails, return the original value
			return storedData;
		}
	} catch (error) {
		console.error('Error reading from localStorage:', error);
		return null;
	}
}

export const getFileUrl = (file) => {
	try {
		if (!file) {
			return ""; // Return empty string for an empty file
		}

		// Use URL.createObjectURL to create a URL for the file
		const fileUrl = URL.createObjectURL(file);
		return fileUrl;
	} catch (error) {
		console.error("Error creating file URL:", error.message);
		return ""; // Return empty string in case of an error
	}
}

const MapBoxJSCDN = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js";
const MapBoxCSSCDN = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css";

const getGeolocation = async () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (geoError) => {
                    reject(new Error(`Failed to retrieve location: ${geoError.message}`));
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
};

// Marker component
export const Marker = ({ latitude, longitude, children }) => {
	// No need to render anything, markers are added directly in MapBox useEffect
	return <div>{children}</div>;
};

// Main mapbox component
export const MapBox = ({
  initialLatitude = null,
  initialLongitude = null,
  initialZoom = 15,
  accessToken,
  children,
  onChange,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(initialLongitude);
  const [lat, setLat] = useState(initialLatitude);
  const [zoom, setZoom] = useState(initialZoom);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const debounceRef = useRef(null); // Store the debounce timer

  // Holds the active markers on the map
  const activeMarkers = useRef(new Map());

  const renderChildren = () => {
    if (map.current) {
      // Clear existing markers
      activeMarkers.current.forEach((marker) => marker.remove());
      activeMarkers.current.clear();

      const childrenArray = expandFragment(children);

      // Add all markers from children
      childrenArray.forEach((child) => {
        if (child.type === Marker) {
          const { latitude, longitude } = child.props;

          if (latitude && longitude) {
            const ref = React.createRef();
            ref.current = document.createElement("div");
            ref.current.className = "marker-dittofi";

            ReactDOM.render(child, ref.current);

            const marker = new window.mapboxgl.Marker(ref.current)
              .setLngLat([longitude, latitude])
              .addTo(map.current);

            activeMarkers.current.set(marker, marker); // Store marker reference
          }
        }
      });
    }
  };

  const handleOnChange = () => {
    if (map.current && onChange) {
      const bounds = map.current.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const boundingBox = {
        SW: { latitude: sw.lat, longitude: sw.lng },
        NE: { latitude: ne.lat, longitude: ne.lng },
      };

      onChange({
        target: {
          value: {
            center: { latitude: lat, longitude: lng },
            zoom: map.current.getZoom().toFixed(2),
            boundingBox,
          },
        },
      });
    }
  };

  // Debounced version of handleOnChange
  const debouncedHandleOnChange = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      handleOnChange();
    }, 200); // Adjust debounce interval as needed
  };

  useEffect(() => {
    renderChildren();
  }, [children]);

  // Effect to update map center on changes
  useEffect(() => {
    // Update if initialLatitude/initialLongitude not in sync with internal lat/lng
    if (lat !== initialLatitude || lng !== initialLongitude) {
      const updateCenter = async () => {
        let latitude = initialLatitude;
        let longitude = initialLongitude;

        if (!latitude || !longitude) {
          try {
            const { latitude: geoLat, longitude: geoLng } =
              await getGeolocation();
            latitude = geoLat;
            longitude = geoLng;
          } catch (geoError) {
            setError(`Failed to retrieve location: ${geoError.message}`);
            console.error(geoError);
            return;
          }
        }

        latitude = Math.min(Math.max(latitude, -90), 90); // Validate latitude range

        if (map.current) {
          map.current.setCenter([longitude, latitude]);
        }

        setLat(latitude);
        setLng(longitude);
      };

      updateCenter();
    }
  }, [initialLongitude, initialLatitude]);

  // Run when change lat, lng
  useEffect(() => {
    debouncedHandleOnChange();
  }, [lat, lng]);

  // Run ones after map loaded
  useEffect(() => {
    if (loading === false) {
      if (map.current) {
        map.current.setCenter([lng, lat]);
      }
      debouncedHandleOnChange();
    }
  }, [loading]);

  // Initialize the map and handle geolocation
  useEffect(() => {
    const initMap = async () => {
      if (map.current) return; // Initialize map only once

      try {
        window.mapboxgl.accessToken = accessToken;

        let centerLat = lat;
        let centerLng = lng;

        // Get geolocation if no initial coordinates are provided
        if (!centerLat || !centerLng) {
          try {
            const { latitude, longitude } = await getGeolocation();
            setLat(latitude);
            setLng(longitude);
            centerLat = latitude;
            centerLng = longitude;
          } catch (geoError) {
            setError(geoError.message);
            console.error(geoError);
            return;
          }
        }

        // Initialize map
        map.current = new window.mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [centerLng, centerLat],
          zoom: zoom,
        });

        setupMapListeners();
        renderChildren();
        setLoading(false);
      } catch (e) {
        console.error("Error initializing the map:", e);
      }
    };

    const setupMapListeners = () => {
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    };

    // Load Mapbox sources and initialize the map
    window.loadSources([MapBoxJSCDN, MapBoxCSSCDN], initMap);

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []); // Empty dependency array ensures this useEffect runs only once

  return (
    <>
      {loading && <div className="loading-message">Loading map...</div>}
      {error && <div className="error-message">{error}</div>}
      <div ref={mapContainer} className="d-map-box" />
    </>
  );
};

const registeredComponents = {};

export const registerComponent = (type, component) => {
	registeredComponents[type] = component;
};

export const DynamicComponent = ({ type, ...props }) => {
	// Check if type is empty
	if (!type) {
		console.warn(`Component type is empty`);
		return null;
	}
	
	// Check if the props object contains a key named "props"
	if (props && props.props) {
		// Spread the properties of the "props" key into the main props
		props = { ...props, ...props.props };
		// Remove the "props" key from the main props
		delete props.props;
	}

	const createChildren = () => {
		if(Array.isArray(props?.children) && props.children.length > 0) {
			return props.children.map((c) => {
				return (
					<DynamicComponent 
						type={c.type}
						props={c.props}
					/>
				);
			});
		}
	}

	// Check if the component type is all lowercase
	if (type === type.toLowerCase()) {
		// Check if the element is a void element
		const voidElements = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];
		if (voidElements.includes(type)) {
			// If it's a void element, don't add children
			return React.createElement(type, { ...props });
		} else {
			// If not a void element, render with children
			return React.createElement(type, { ...props }, createChildren(), props.text);
		}
	}

	// Check if the component is registered
	const Component = registeredComponents[type];

	if (Component) {
		// Render the registered React component with the provided props
		return <Component {...props}>{createChildren()}</Component>;
	} else {
		// Log a warning if the component is not found
		console.warn(`Component "${type}" not found`);
		// Return null or handle the missing component case
		return null;
	}
}
