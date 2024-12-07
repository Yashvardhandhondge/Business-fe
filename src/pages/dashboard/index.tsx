import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../../NewComponents/Card";
import CurrentCashflow from "../../NewComponents/CurrentCashflow";
import ExpectedSalary from "../../NewComponents/ExpectedSalary";
import GrossRevenue from "../../NewComponents/GrossRevenue";
import AskingPrice from "../../NewComponents/AskingPrice";
import SDE from "../../NewComponents/SDE";
import DSCRCalculator from "../../NewComponents/DSCRCalculator";
import ProjectedCashflow from "../../NewComponents/ProjectedCashflow";
import GrossMultiple from "../../NewComponents/GrossMultiple";
import SDEMultiple from "../../NewComponents/SDEMultiple";
import SBALoanPayment from "../../NewComponents/SBALoanPayment";
import AdditionalLoanPayment from "../../NewComponents/AdditionalLoanPayment";
import TotalDebtPayments from "../../NewComponents/TotalDebtPayments";
import ProjectedNetProfitMargin from "../../NewComponents/ProjectedNetProfitMargin";
import CustomMetric from "../../NewComponents/CustomMetric";
import NotesComponent from "../../NewComponents/NotesComponent";
import TopBar from "../../NewComponents/TopBar";
import { Button } from '../../components/ui/button';
import MetricCard from "../../NewComponents/MetricCard";
import { useParams, useNavigate } from "react-router-dom";
import useBusinessStore from "../../store/buisnessSrore";
import ReportModal from "../../NewComponents/ReportModal";


const App: React.FC = () => {
  const params = useParams()
  const {fetchBusiness, updateBusiness,addBusiness} = useBusinessStore()
  const businessid = params.id
  const [businessData, setBusinessData] = useState<any>()
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isUnAdded, setIsUnAdded] = useState<boolean>(false)
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const [state, setState] = useState({
    currentCashflow: 0,
    expectedSalary: 0,
    grossRevenue: 0,
    askingPrice: 0,
    sde: 0,
    projectedCashflow: 0,
    totalDebtPayments: 0,
    sbaLoanPayment: 0,
    additionalLoanPayment: 0,
    customMetric: 0,
    projectedNetProfitMargin:0,
    dscr: 0,
    grossMultiple:0,
    sdeMultiple: 0,
    loan_sba_amount:0,
    loan_sba_term:0,
    loan_sba_rate:0,
    additional_loan_term:0,
    additional_loan_rate:0,
    additional_loan_amount:0,
    newExpenses:0,
    additionalDebt: 0,
    notes: {
      currentCashflow: ["Notes for currentCashflow"],
      expectedSalary: ["Notes for expectedSalary"],
      grossRevenue: ["Notes for grossRevenue"],
      askingPrice: ["Notes for askingPrice"],
      sde: ["Notes for sde"],
      projectedCashflow: ["Notes for projectedCashflow"],
      totalDebtPayments: ["Notes for totalDebtPayments"],
      sbaLoanPayment: ["Notes for sbaLoanPayment"],
      additionalLoanPayment: ["Notes for additionalLoanPayment"],
      customMetric: ["Notes for customMetric"],
      projectedNetProfitMargin: ["Notes for projectedNetProfitMargin"],
      dscr: ["Notes for dscr"],
      grossMultiple: ["Notes for grossMultiple"],
      sdeMultiple: ["Notes for sdeMultiple"],
    }
  });

  const [customMetrics, setCustomMetrics] = useState<{
    metricName: string,
    metricValue: string,
    metricType: "X" | "$" | "%" | "N",
    notes: string[],
  }[]>([]);

  const [cardOrder, setCardOrder] = useState([
    "currentCashflow",
    "expectedSalary",
    "grossRevenue",
    "askingPrice",
    "sde",
    "DSCRCalculator",
    "ProjectedCashflow",
    "GrossMultiple",
    "SDEMultiple",
    "SBALoanPayment",
    "AdditionalLoanPayment",
    "TotalDebtPayments",
    "ProjectedNetProfitMargin",
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusiness(businessid || "");
      console.log(data);
      setBusinessData(data?.business)
      setState({
        ...state,
        currentCashflow: data?.business?.data?.current_cashflow.value || 0,
        expectedSalary: data?.business?.data?.expected_salary?.value || 0,
        grossRevenue: data?.business?.data?.gross_revenue?.value || 0,
        askingPrice: data?.business?.data?.asking_price?.value || 0,
        sbaLoanPayment: data?.business?.data?.sba_loan_payment?.value || 0,
        loan_sba_term: data?.business?.data?.loan_sba?.term || 0,
        loan_sba_rate: data?.business?.data?.loan_sba?.rate || 0,
        additional_loan_amount: data?.business?.data?.additional_loan.amount || 0,
        additional_loan_term: data?.business?.data?.additional_loan?.term || 0,
        additional_loan_rate: data?.business?.data?.additional_loan?.rate || 0,
        additionalLoanPayment: data?.business?.data?.additional_loan?.amount || 0,
        totalDebtPayments: data?.business?.data?.total_debt_payments?.value || 0,
        projectedNetProfitMargin: data?.business?.metrics?.net_profit_margin?.value || 0,
        dscr: data?.business?.metrics?.dscr?.value || 0,
        grossMultiple: data?.business?.metrics?.gross_multiple?.value || 0,
        sdeMultiple: data?.business?.metrics?.sde_multiple?.value || 0,
        sde: data?.business?.data?.sde?.value || 0,
        projectedCashflow: data?.business?.data?.projected_cashflow?.value || 0,
        loan_sba_amount: data?.business?.data?.loan_sba?.amount || 0,
        newExpenses: data?.business?.data?.new_expenses?.value || 0,
        additionalDebt: data?.business?.data?.additional_debt?.value || 0,
        notes:{
          ...state.notes,
          currentCashflow: data?.business?.data?.current_cashflow?.notes || ["Notes for currentCashflow"],
          expectedSalary: data?.business?.data?.expected_salary?.notes || ["Notes for expectedSalary"],
          grossRevenue: data?.business?.data?.gross_revenue?.notes || ["Notes for grossRevenue"],
          askingPrice: data?.business?.data?.asking_price?.notes || ["Notes for askingPrice"],
          // sde: data?.business?.data?.sde.notes || ["Notes for sde"],
          // projectedCashflow: data?.business?.data?.projected_cashflow.notes || ["Notes for projectedCashflow"],
          // totalDebtPayments: data?.business?.data?.loan_sba.notes || ["Notes for totalDebtPayments"],
          // sbaLoanPayment: data?.business?.data?.loan_sba.notes || ["Notes for sbaLoanPayment"],
          // additionalLoanPayment: data?.business?.data?.additional_loan.notes || ["Notes for additionalLoanPayment"],
          // projectedNetProfitMargin: data?.business?.metrics?.net_profit_margin.notes || ["Notes for projectedNetProfitMargin"],
        },
      });

      setCustomMetrics(data?.business?.data?.custom_fields?.map((field:any) => ({
        metricName: field.name,
        metricValue: field.value,
        metricType: field.type,
        notes: field.notes,
      })) || []);
    };
    if(localStorage.getItem('user_id')){
      fetchData();
      if(localStorage.getItem('business_payload')){
        setIsUnAdded(true)
        const business = JSON.parse(localStorage.getItem('business_payload')!);
        setBusinessData({data: business})
        setState({
          ...state,
          currentCashflow: business?.current_cashflow.value || 0,
          expectedSalary: business?.expected_salary.value || 0,
          grossRevenue: business?.gross_revenue.value || 0,
          askingPrice: business?.asking_price.value || 0,
          sbaLoanPayment: business?.sba_loan_payment.value || 0,
          loan_sba_term: business?.loan_sba.term || 0,
          loan_sba_rate: business?.loan_sba.rate || 0,
          additional_loan_amount: business?.additional_loan.amount || 0,
          additional_loan_term: business?.additional_loan.term || 0,
          additional_loan_rate: business?.additional_loan.rate || 0,
          additionalLoanPayment: business?.additional_loan.amount || 0,
          totalDebtPayments: (business?.loan_sba.amount + business?.additional_loan.amount) || 0,
          projectedNetProfitMargin: business?.net_profit_margin || 0,
          dscr: business?.dscr || 0,
          sdeMultiple: business?.sde_multiple || 0,
          sde: business?.sde.value || 0,
          projectedCashflow: business?.projected_cashflow.value || 0,
          loan_sba_amount: business?.loan_sba.amount || 0,
          newExpenses: business?.new_expenses.value || 0,
          additionalDebt: business?.additional_debt.value || 0,
          notes:{
          ...state.notes,
          currentCashflow: business?.current_cashflow.notes || ["Notes for currentCashflow"],
          expectedSalary: business?.data?.expected_salary.notes || ["Notes for expectedSalary"],
          grossRevenue: business?.gross_revenue.notes || ["Notes for grossRevenue"],
          askingPrice: business?.asking_price.notes || ["Notes for askingPrice"],
          }
        })
      }
      
    }else{
      const business = localStorage.getItem('business');
      if(business){
        setBusinessData({data: JSON.parse(business)})
        console.log("business", JSON.parse(business));
      }
    }
  }, []);

  function calculateYearlyPayment(loan_amount:number, loan_term:number, loan_rate:number) {
    if (loan_amount <= 0 || loan_term <= 0 || loan_rate <= 0) {
        return 0; // No payment needed if any parameter is zero or negative
    }

    // Convert the annual rate to a decimal
    const r = loan_rate / 100;

    // Calculate yearly payment using the annuity formula
    const yearlyPayment = (r * loan_amount) / (1 - Math.pow((1 + r), -loan_term));

    return Number(yearlyPayment.toFixed(2)); // Round to 2 decimal places
}


  useEffect(() => {
    const calculateMetrics = () => {

      const additionalLoanPayment = calculateYearlyPayment(state.additional_loan_amount, state.additional_loan_term, state.additional_loan_rate);
      const sbaLoanPayment = calculateYearlyPayment(state.loan_sba_amount, state.loan_sba_term, state.loan_sba_rate);

      
      
      const dscr = state.totalDebtPayments > 0 
        ? Number(((state.currentCashflow + state.expectedSalary) / state.totalDebtPayments).toFixed(4))
        : 0;
  
      const projectedCashflow = state.currentCashflow - state.totalDebtPayments - state.newExpenses;
  
      const grossMultiple = state.grossRevenue > 0 
        ? Number((state.askingPrice / state.grossRevenue).toFixed(2))
        : 0;
  
      const sdeMultiple = state.sde > 0 
        ? Number((state.askingPrice / state.sde).toFixed(2))
        : 0;
        
  
      const projectedNetProfitMargin = state.grossRevenue > 0 
        ? Number(((projectedCashflow / state.grossRevenue) * 100).toFixed(2))
        : 0;

  
      setState((prevState) => ({
        ...prevState,
        // totalDebtPayments,
        dscr,
        projectedCashflow,
        grossMultiple,
        sdeMultiple,
        projectedNetProfitMargin,
        additionalLoanPayment,
        sbaLoanPayment,
      }));
    };
  
    calculateMetrics();
  }, [
    state.totalDebtPayments,
    state.currentCashflow,
    state.expectedSalary,
    state.totalDebtPayments,
    state.askingPrice,
    state.grossRevenue,
    state.sde,
    state.loan_sba_amount,
    state.additional_loan_amount,
    state.newExpenses,
    state.additionalDebt
  ]);

  useEffect(() => {
    const totalDebtPayments = Number((state.sbaLoanPayment + state.additionalLoanPayment).toFixed(2)) || 0; 
    setState((prevState) => ({
      ...prevState,
      totalDebtPayments
    }))
  },[
    state.additionalLoanPayment,
    state.sbaLoanPayment,
  ])
  
  const handleSave = async () => {
   
    let payload:any = {
      current_cashflow: {value: state.currentCashflow, notes: state.notes.currentCashflow},
      expected_salary: {value: state.expectedSalary, notes: state.notes.expectedSalary},
      gross_revenue: {value: state.grossRevenue, notes: state.notes.grossRevenue},
      asking_price: {value: state.askingPrice, notes: state.notes.askingPrice},
      loan_sba: {amount: state.loan_sba_amount, term: state.loan_sba_term, rate: state.loan_sba_rate, notes: state.notes.sbaLoanPayment},
      additional_loan: {amount: state.additional_loan_amount, term: state.additional_loan_term, rate: state.additional_loan_rate, notes: state.notes.additionalLoanPayment},
      sde: {value: state.sde, notes: state.notes.sde},
      dscr: {value: state.dscr},
      gross_multiple: {value: state.grossMultiple},
      sde_multiple: {value: state.sdeMultiple},
      projected_cashflow: {value: state.projectedCashflow},
      projected_net_profit_margin: {value: state.projectedNetProfitMargin},
      total_debt_payments: {value: state.totalDebtPayments},
      sba_loan_payment: {value: state.sbaLoanPayment},
      additional_loan_payment: {value: state.additionalLoanPayment},
      new_expenses: {value:state.newExpenses},
      additional_debt: {value:state.additionalDebt}
    };

    if(customMetrics.length >= 0){
      payload = {
        ...payload,
        custom_fields: customMetrics.map((metric) => ({
          name: metric.metricName,
          value: metric.metricValue,
          type: metric.metricType,
          notes: metric.notes,
        })),
      }
    }
    if(localStorage.getItem('user_id')){
      if(isUnAdded){
        const updated = await addBusiness({...businessData?.data, ...payload});
        console.log("updated", updated);
        setHasChanges(false)
        setIsUnAdded(false)
        localStorage.removeItem('business_payload')
        localStorage.removeItem('business')
      }else{
        const updated = await updateBusiness(businessid || "", payload);
        console.log("updated", updated);
        setHasChanges(false)
      }
    }else{
      localStorage.setItem('business_payload', JSON.stringify({...businessData?.data, ...payload}));
      navigate('/login')
      setHasChanges(false)
    }
  }


  const updateLoanSba = (value: {amount:number, term:number, rate:number}) => {
        setState((prevState) => ({
          ...prevState,
          loan_sba_amount: value.amount,
          loan_sba_term: value.term,
          loan_sba_rate: value.rate,
        }));
  }
  const updateLoanAdditionalLoan = (value: {amount:number, term:number, rate:number}) => {
        setState((prevState) => ({
          ...prevState,
          additional_loan_amount: value.amount,
          additional_loan_term: value.term,
          additional_loan_rate: value.rate,
        }));
  }
  
  const updateNotes = async (key: string, value: string) => {
    setHasChanges(true)
    setState((prevState) => ({
      ...prevState,
      notes: {
        ...prevState.notes,
        [key]: value.split("\n"),
      },
    }));
  }

  // const updateStateBackend = async (key:string, value:number) => {
  //   let payload = {}
  //   switch(key){
  //     case 'currentCashflow': payload = {current_cashflow: {value, notes: state.notes.currentCashflow}}
  //     break;
  //     case 'expectedSalary': payload = {expected_salary: {value, notes: state.notes.expectedSalary}}
  //     break;
  //     case 'grossRevenue': payload = {gross_revenue: {value, notes: state.notes.grossRevenue}}
  //     break;
  //     case 'askingPrice': payload = {asking_price: {value, notes: state.notes.askingPrice}}
  //     break;
  //     // case 'sde': payload = {sde: {value}}
  //     // break;
  //     case 'sbaLoanPayment': payload = {loan_sba: {amount: value, rate: state.loan_sba_rate, term: state.loan_sba_term, notes: state.notes.sbaLoanPayment}}
  //     break;
  //     case 'additionalLoanPayment': payload = {additional_loan: {amount: value, rate: state.additional_loan_rate, term: state.additional_loan_term, notes: state.notes.additionalLoanPayment}}
  //     break;
  //     case 'totalDebtPayments': payload = {loan_sba: {amount: value}, additional_loan: {amount: value}}
  //     break
  //     case 'loan_sba_amount': payload = {loan_sba: {amount: value, rate: state.loan_sba_rate, term: state.loan_sba_term}}
  //     break
  //     case 'loan_sba_rate': payload = {loan_sba: {rate: value, term: state.loan_sba_rate, amount: state.sbaLoanPayment}}
  //     break
  //     case 'loan_sba_term': payload = {loan_sba: {term: value, rate: state.loan_sba_rate, amount: state.sbaLoanPayment}}
  //     break
  //     case 'additional_loan_amount': payload = {additional_loan: {amount: value, rate: state.loan_sba_rate, term: state.loan_sba_term}}
  //     break
  //     case 'additional_loan_rate': payload = {additional_loan: {rate: value, term: state.additional_loan_term, amount: state.additionalLoanPayment}}
  //     break
  //     case 'additional_loan_term': payload = {additional_loan: {term: value, rate: state.additional_loan_rate, amount: state.additionalLoanPayment}}
  //     break
  //     }

  //     const updated = await updateBusiness(businessid || "", payload);
  //     console.log("updated", updated);
      
  // }

  const metricCards = cardOrder.map((id) => ({
    id,
    name: id.replace(/([A-Z])/g, " $1"), // Convert camelCase to readable text
    value: state[id as keyof typeof state],
  }));

  const updateState = async (key: string, value: number | string) => {
    setHasChanges(true)
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newOrder = Array.from(cardOrder);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);

    setCardOrder(newOrder);
  };

  const renderCard = (id: string) => {
    switch (id) {
      case "currentCashflow":
        return (
          <Card
            value={state.currentCashflow}
            onSave={(value) => updateState("currentCashflow", value)}
          >
            <CurrentCashflow updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "expectedSalary":
        return (
          <Card
            value={state.expectedSalary}
            onSave={(value) => updateState("expectedSalary", value)}
          >
            <ExpectedSalary updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "grossRevenue":
        return (
          <Card
            value={state.grossRevenue}
            onSave={(value) => updateState("grossRevenue", value)}
          >
            <GrossRevenue updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "askingPrice":
        return (
          <Card
            value={state.askingPrice}
            onSave={(value) => updateState("askingPrice", value)}
          >
            <AskingPrice updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "sde":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <SDE state={state} updateState={updateState} />
          </Card>
        );
      case "DSCRCalculator":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <DSCRCalculator state={state} updateState={updateState} />
          </Card>
        );
      case "ProjectedCashflow":
        return (
          <Card
            value={state.projectedCashflow}
            onSave={(value) => updateState("projectedCashflow", value)}
          >
            <ProjectedCashflow state={state} updateState={updateState} />
          </Card>
        );
      case "GrossMultiple":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <GrossMultiple state={state} updateState={updateState} />
          </Card>
        );
      case "SDEMultiple":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <SDEMultiple state={state} updateState={updateState} />
          </Card>
        );
      case "SBALoanPayment":
        return (
          <Card
            value={state.sbaLoanPayment}
            onSave={(value) => updateState("sbaLoanPayment", value)}
          >
            <SBALoanPayment updateLoanSba={updateLoanSba} state={state} updateState={updateState} />
          </Card>
        );
      case "AdditionalLoanPayment":
        return (
          <Card
            value={state.additionalLoanPayment}
            onSave={(value) => updateState("additionalLoanPayment", value)}
          >
            <AdditionalLoanPayment updateAdditionalLoan={updateLoanAdditionalLoan} state={state} updateState={updateState} />
          </Card>
        );
      case "TotalDebtPayments":
        return (
          <Card
            value={state.totalDebtPayments}
            onSave={(value) => updateState("totalDebtPayments", value)}
          >
            <TotalDebtPayments state={state} updateState={updateState} />
          </Card>
        );
      case "ProjectedNetProfitMargin":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <ProjectedNetProfitMargin state={state} updateState={updateState} />
          </Card>
        );
      case "customMetric":
        return (
          <Card
          value={state.sde}
          onSave={(value) => updateState("sde", value)}
        >
          <MetricCard state={customMetrics[0]} updateMetric={setCustomMetrics} deleteCard={(name) => setCustomMetrics(customMetrics.filter((metric) => metric.metricName !== name))} />
        </Card>
            
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container min-h-screen bg-blue-50">
      <TopBar data={businessData?.data} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="metrics-grid">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "12px",
                padding: "12px",
                minHeight: "100px",
              }}
              className="bg-blue-50 rounded-lg"
            >
              {metricCards
                .filter(
                  (card) =>
                    ![
                      "sba_loan_amount",
                      "sba_loan_rate",
                      "sba_loan_term",
                      "additional_debt",
                      "additional_loan_amount",
                      "additional_loan_rate",
                      "additional_loan_term",
                      "growth_rate",
                    ].includes(card.id)
                )
                .map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <div {...provided.dragHandleProps} className="h-full">
                          {renderCard(card.id)}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              
              {customMetrics
                .map((card, index) => (
                  <Draggable
                    key={card.metricName}
                    draggableId={card.metricName}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <div {...provided.dragHandleProps} className="h-full">
                          {renderCard("customMetric")}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                <Card value={0} onSave={(value) => updateState("customMetric", value)}>
                <CustomMetric customMetrics={customMetrics} setCustomMetrics={setCustomMetrics} state={state} updateState={updateState} />
                </Card>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
     <div className="flex justify-end m-4">
       <Button className="bg-blue-500 text-white" onClick={() => setReportModalOpen(true)}>Download Report</Button>
       <NotesComponent state={state} updateState={updateState} />
       {(hasChanges || isUnAdded) && <Button className="bg-green-500 text-white" onClick={handleSave}>Save Changes</Button>}
     </div>
     {reportModalOpen && <ReportModal data={state} close={() => setReportModalOpen(false)} />}
    </div>
  );
};

export default App;
