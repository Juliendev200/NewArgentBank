import FeatureItem from "./FeatureItem";

export default function Values() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem
        img="/img/icon-chat.png"
        title="You are our #1 priority"
        content=" Need to talk to a representative? You can get in touch through our 24/7
        chat or through a phone call in less than 5 minutes."
      />
      <FeatureItem
        img="/img/icon-money.png"
        title="More savings means higher rates"
        content="The more you save with us, the higher your interest rate will be!"
      />
      <FeatureItem
        img="/img/icon-security.png"
        title="Security you can trust"
        content=" We use top of the line encryption to make sure your data and money is
        always safe."
      />
    </section>
  );
}
