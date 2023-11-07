package Business;


import org.example.util.Business.Action;
import org.example.util.Business.BusinessRuleEngine;
import org.junit.jupiter.api.Test;


import static org.example.util.Business.Stage.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


public class BusinessTest {
    @Test
    void shouldHaveNoRulesInitially(){
        final BusinessRuleEngine businessRuleEngine = new BusinessRuleEngine();
        assertEquals(0, businessRuleEngine.count());
    }

    @Test
    void shouldAddTwoActions(){
        final BusinessRuleEngine businessRuleEngine = new BusinessRuleEngine();

        businessRuleEngine.addAction(() -> {});
        businessRuleEngine.addAction(() -> {});

        assertEquals(2, businessRuleEngine.count());
    }

    @Test
    void shouldExecuteOneAction(){
        final BusinessRuleEngine businessRuleEngine = new BusinessRuleEngine();
        final Action mockAction = mock(Action.class);

        businessRuleEngine.addAction(mockAction);
        businessRuleEngine.run();

        verify(mockAction).perform();
    }

    @Test
    void switchTest{
        var amount = 1;
        var forecastedAmount = amount * switch(dealStage){
            case LEAD -> 0.2;
            case EVALUATING -> 0.5;
            case INTERESTED -> 0.8;
            case CLOSED -> 1;
        }
    }

}
