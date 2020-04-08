import React, { useEffect } from 'react';
import { Popconfirm} from 'antd';
import { Dashboard } from '../Dashboard';
import { DashboardItems } from './DashboardItems';
import { EditContents } from './EditContents';
import { SlideOptions } from './SlideOptions';
import { observer } from 'mobx-react';
import { useMst } from '../../context/context';
import { Steps, message, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {HomePage} from '../HomePage';


const { Step } = Steps;
const steps = [
  {
    title: 'Select Dashboards',
    content: <Dashboard />,
  },
  {
    title: 'Select Dashboard Items',
    content: <DashboardItems />,
  },
  {
    title: 'Edit Contents',
    content: <EditContents />,
  }, {
    title: 'Slide Options',
    content: <SlideOptions />,
  }
];


export const HorizontalLabelPositionBelowStepper = observer(() => {
  const [activeStep, setActiveStep] = React.useState(0);
  const store = useMst();
  let history = useHistory();
  
  const savePresentations = () =>{
    store.savePresentation
  }
  
  // const handleSavePresentation = () =>{
  //   //alert('Your presentation has been saved succefully')
  //   savePresentations();
  //   <HomePage/>
    
  // }


  useEffect(() => {
    store.fetchDashboards();
  }, [store])
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleCancel = () => {
    history.push('?page=3');
  };

  return (
    <div className="px-8 flex py-12 flex-col">
      <div className="">
        <Steps current={activeStep} >
          {steps.map((item, i, icon) => {
            if (i < activeStep) {
              return <Step key={item.title} title={item.title}
                icon={<CheckCircleFilled style={{ size: 'large', color: '	#3DC807' }} />} />
            }
            else {
              return <Step key={item.title} title={item.title} />
            }
          })}
        </Steps>
        <div className="mt-10">{steps[activeStep].content}</div>
      </div>
      <div className="bottom-0  absolute flex mb-4" style={{ width: '97%' }}>
        <div className="w-1/2 text-left">
          {activeStep > 0 && (
            <Button onClick={() => handleBack()}>
              Previous
            </Button>
          )}
          {
            <Button type="primary" className="ml-5" onClick={() => handleCancel() } >
              Cancel
            </Button>
          }
        </div>

        <div className="w-1/2 text-right mr-32">
          {activeStep < steps.length - 1 && (
            <Button type="primary" onClick={() => handleNext()}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button type="primary" 
            onClick={store.savePresentation}>
              Save Presentation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});