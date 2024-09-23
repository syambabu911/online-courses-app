import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Transaction() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, plan, totalAmount } = location.state || {};
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handlePaymentMethodChange = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };
  const handlePayNow = () => {
    navigate('/payments', {
      state: {
        course,
        totalAmount,
        paymentMethod: selectedPaymentMethod
      }
    });
  };


  const textContent = {
    en: {
      preferredPaymentMethods: 'Preferred Payment Methods',
      cardsAndMore: 'Cards & More',
      account: 'Account',
      viewDetails: 'View details',
      payNow: 'Pay Now',
      courseName: `Course Name: ${course?.title}`,
      purchaseAmount: `Purchase Amount: ₹ ${totalAmount}/-`,
      language: 'Language'
    },
    hi: {
      preferredPaymentMethods: 'पसंदीदा भुगतान विधियाँ',
      cardsAndMore: 'कार्ड और अधिक',
      account: 'खाता',
      viewDetails: 'विवरण देखें',
      payNow: 'अब भुगतान करें',
      courseName: `कोर्स का नाम: ${course?.title}`,
      purchaseAmount: `खरीद राशि: ₹ ${totalAmount}/-`,
      language: 'भाषा'
    },
    te: {
      preferredPaymentMethods: 'ప్రిఫర్డ్ చెల్లింపు పద్ధతులు',
      cardsAndMore: 'కార్డులు & మరిన్ని',
      account: 'ఖాతా',
      viewDetails: 'వివరాలు చూడండి',
      payNow: 'ఇప్పుడే చెల్లించండి',
      courseName: `కోర్సు పేరు: ${course?.title}`,
      purchaseAmount: `కొనుగోలు మొత్తం: ₹ ${totalAmount}/-`,
      language: 'భాష'
    }
  };

  const content = textContent[selectedLanguage];

  return (
    <div className="transaction-container">
      <h2>{content.preferredPaymentMethods}</h2>
      <div>
        <label>{content.language}: </label>
        <select onChange={(e) => handleLanguageChange(e.target.value)} value={selectedLanguage}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>
      <div className="payment-methods">
        <button
          onClick={() => handlePaymentMethodChange('Phone Pay')}
          className={selectedPaymentMethod === 'Phone Pay' ? 'active' : ''}
        >
          <img src="https://th.bing.com/th/id/OIP.UfVO2fVDj3JQYVKM2WFmMQAAAA?rs=1&pid=ImgDetMain" alt="phonepay" />
        </button>
        <button
          onClick={() => handlePaymentMethodChange('Google Pay')}
          className={selectedPaymentMethod === 'Google Pay' ? 'active' : ''}
        >
          <img src="https://static.vecteezy.com/system/resources/previews/017/221/853/original/google-pay-logo-transparent-free-png.png" alt="googlepay" />
        </button>
        <button
          onClick={() => handlePaymentMethodChange('Paytm')}
          className={selectedPaymentMethod === 'Paytm' ? 'active' : ''}
        >
          <img src="https://th.bing.com/th/id/OIP.dnZxZlhL7MW6RbYyuw56QQAAAA?rs=1&pid=ImgDetMain" alt="paytm" />
        </button>
      </div>

      <h2>{content.cardsAndMore}</h2>
      <div className="other-options">
        <button>
          <img src="https://th.bing.com/th/id/R.866561832e4c4bba0ae25a1010db0aa2?rik=lMUdgThcohR2Kg&riu=http%3a%2f%2fwww.fmb-bank.com%2fContentImageHandler.ashx%3fImageId%3d117704&ehk=th%2fd4X6RD88UWGxpMydg7dgoDfkSBrnjPDLcBnN5%2bxM%3d&risl=&pid=ImgRaw&r=0" alt="card" />Card
        </button>
        <button>
          <img src="https://img.freepik.com/premium-vector/bank-building-icon-isolated-white_68708-406.jpg?w=740" alt="netbanking" />Netbanking
        </button>
        <button>
          <img src="https://thumbs.dreamstime.com/b/print-142767756.jpg" alt="emi" />EMI
        </button>
      </div>

      <h2>{content.account}</h2>
      <div className="account-details">
        <p>{content.courseName}</p>
        <p>{content.purchaseAmount}</p>
        <button className="view-details" onClick={handleViewDetails}>{content.viewDetails}</button>
        {showDetails && (
          <div className="details-content">
            <p><b>Course Description:</b> {course?.description}</p>
            <p><b>Plan Name:</b> {plan?.name}</p>
            <p><b>Plan Duration:</b> {plan?.duration}</p>
          </div>
        )}
        <button className="pay-now" onClick={handlePayNow}>{content.payNow}</button>
      </div>
    </div>
  );
}

export default Transaction;