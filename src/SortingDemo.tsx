import HeaderButton from "./ui/HeaderButton";

export default function SortingDemo() {
  return (
    <section className="grid grid-cols-1">
      <header className="flex">
        <div>
          <HeaderButton>Test1</HeaderButton>
          <HeaderButton>Test2</HeaderButton>
          <HeaderButton>Test3</HeaderButton>
          <HeaderButton>Test4</HeaderButton>
          <HeaderButton>Test5</HeaderButton>
        </div>
        <button>Visualize</button>
      </header>
      <section>Canvas</section>
    </section>
  );
}
