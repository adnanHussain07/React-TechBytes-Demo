import React from 'react';
import Card from '../shared/ui/Card';
import Button from '../shared/ui/Button';

const Composition: React.FC = () => {
  return (
    <div>
      <h2>Components & Composition</h2>
      <p>
        Components are the building blocks of React applications. They can be composed together to
        create complex UIs. Composition is achieved by passing data via <code>props</code> and by
        rendering other components as <code>children</code>.
      </p>

      <h3>Example 1: Props and Children</h3>
      <p>
        Here we use a generic <code>Card</code> component. The content inside the card, including
        text and a button, is passed as <code>children</code>. The <code>title</code> is passed as a
        prop.
      </p>
      <Card title="Welcome to Composition">
        <p>This is content inside the card.</p>
        <p>
          It&apos;s rendered thanks to <code>props.children</code>.
        </p>
        <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
      </Card>

      <Card title="Another Card">
        <p>Different content for another card.</p>
        <p>Notice how the layout and styling are consistent.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <Button variant="secondary" onClick={() => alert('Secondary button clicked!')}>
          Learn More
        </Button>
      </Card>

      <h3>Example 2: Specialized Components (Composition over Inheritance)</h3>
      <p>
        Instead of inheritance, React favors composition. We can create specialized components that
        internally use other, more generic components.
      </p>

      <ProfileCard
        name="Alice Johnson"
        email="alice@example.com"
        bio="Frontend developer with a passion for clean code."
      />
      <ProfileCard
        name="Bob Smith"
        email="bob@example.com"
        bio="Backend engineer focusing on scalable systems."
      />
    </div>
  );
};

type ProfileCardProps = {
  name: string;
  email: string;
  bio: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, bio }) => {
  return (
    <Card
      title={`Profile: ${name}`}
      footer={<Button onClick={() => alert(`Contacting ${name}`)}>Contact</Button>}
    >
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
    </Card>
  );
};

export default Composition;
