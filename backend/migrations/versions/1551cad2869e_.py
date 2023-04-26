"""empty message

Revision ID: 1551cad2869e
Revises: a70e9229cdd9
Create Date: 2023-04-26 13:47:46.496980

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1551cad2869e'
down_revision = 'a70e9229cdd9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.add_column(sa.Column('text', sa.String(length=2500), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.drop_column('text')

    # ### end Alembic commands ###